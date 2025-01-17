import { useEffect, useState } from 'react'

const useIsResizing = () => {
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      setIsResizing(true)
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsResizing(false)
      }, 200)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return isResizing
}

export default useIsResizing
