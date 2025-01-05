import { useQuery, useQueryClient } from '@tanstack/react-query'

type SetGlobalState<T> = (newState: T) => void

const GLOBAL_STATE_KEY_PREFIX = 'GLOBAL_STATE'

export function useGlobalState<T = undefined>(
  key: string,
  initialState?: T
): [T | undefined, SetGlobalState<T>] {
  const queryClient = useQueryClient()

  // Define el prefijo para la clave global del estado
  const stateKey = [GLOBAL_STATE_KEY_PREFIX, key]

  // Utiliza React Query para manejar el estado global con un fallback al estado inicial
  const { data } = useQuery({
    queryKey: stateKey,
    queryFn: () => {
      if (initialState === undefined) {
        throw new Error('Initial state is required')
      }
      return initialState
    },
    initialData: initialState, // Proporciona el estado inicial directamente
    notifyOnChangeProps: ['data']
  })

  // Función para actualizar el estado global
  const setData: SetGlobalState<T> = (newState) => {
    queryClient.setQueryData(stateKey, newState)
  }

  return [data as T, setData]
}
