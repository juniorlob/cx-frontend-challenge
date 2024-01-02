import { BREAKPOINTS } from '@/lib/constants/theme.constants'
import { Breakpoints } from '@/lib/types/theme.types'
import { useEffect, useState } from 'react'

const useBreakpoint = (breakpoint: keyof Breakpoints) => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(BREAKPOINTS[breakpoint])
    const handleResize = () => setMatches(mediaQuery.matches)

    handleResize()
    mediaQuery.addEventListener('change', handleResize)

    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [breakpoint])

  return matches
}

export default useBreakpoint
