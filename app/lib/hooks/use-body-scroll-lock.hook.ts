import { useLayoutEffect } from 'react'

const useBodyScrollLock = (lock: boolean) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    const originalPaddingRight = window.getComputedStyle(
      document.body
    ).paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    if (lock) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [lock])
}

export default useBodyScrollLock
