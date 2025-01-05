import { useLoader } from '@/hooks/useLoader'

const LoaderComponentAsync = ({
  valuesAsync,
  children
}: {
  valuesAsync: any[]
  children: any
}) => {
  const isPending = useLoader(valuesAsync)
  if (isPending) {
    return <div className="flex-1">Loading...</div>
  }
  return <>{children}</>
}

export default LoaderComponentAsync
