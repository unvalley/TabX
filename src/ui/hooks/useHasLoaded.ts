import { useEffect, useState } from 'react'

export const useHasLoaded = () => {
  const [hasLoaded, setHasLoaded] = useState(false)
  useEffect(() => {
    setHasLoaded(true)
  }, [])
  return [hasLoaded] as const
}
