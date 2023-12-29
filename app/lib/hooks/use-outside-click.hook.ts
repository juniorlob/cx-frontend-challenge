import { useEffect, RefObject } from 'react'

const useOutsideClickHandler = <T extends HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isOutside = Array.isArray(refs)
        ? refs.every((ref) => ref.current && !ref.current.contains(target))
        : refs.current && !refs.current.contains(target)

      if (isOutside) callback()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [refs, callback])
}

export default useOutsideClickHandler
