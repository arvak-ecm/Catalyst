import { useEffect, useState } from 'react'

export function useLoader<T>(values: T[]): boolean {
  const [isPending, setIsPending] = useState<boolean>(true)

  useEffect(() => {
    const allValuesLoaded = values.every(
      (value) => value !== undefined && value !== null
    )
    if (allValuesLoaded) {
      setIsPending(false)
    }
  }, [values])

  return isPending
}
