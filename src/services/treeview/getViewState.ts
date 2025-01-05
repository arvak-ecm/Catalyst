import { getStorage } from '@/functions/storage'
import { TreeViewStateProps } from '@/types/treeView'
import { queryOptions } from '@tanstack/react-query'

export const getViewStateQueryOptions = (key: string) => {
  return queryOptions({
    queryKey: ['getViewState'],
    queryFn: () => getViewState(key),
    gcTime: 100,
    staleTime: 10
  })
}

export const getViewState = async (
  key: string
): Promise<TreeViewStateProps> => {
  const viewState = await getStorage(key)
  return JSON.parse(viewState || '{}')
}
