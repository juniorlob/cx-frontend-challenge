import {
  AnchorOrigin,
  PopoverPosition,
} from '@/lib/components/shared/popover/popover.types'
import { useState, useCallback, useEffect, useRef } from 'react'

const usePopover = (
  anchorOrigin: AnchorOrigin,
  onStateChange?: (open: boolean) => void
) => {
  const [open, setOpen] = useState<boolean>(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const updatePosition = useCallback(() => {
    if (triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      return calculatePopoverPosition(triggerRect, contentRect, anchorOrigin)
    }
    return {}
  }, [anchorOrigin])

  useEffect(() => {
    if (open) {
      const positionStyle = updatePosition()
      if (contentRef.current) {
        contentRef.current.style.left = `${positionStyle.left}px`
        contentRef.current.style.top = `${positionStyle.top}px`
      }
    }
  }, [open, updatePosition])

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen((prev) => !prev)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (onStateChange) onStateChange(open)
  }, [onStateChange, open])

  return { open, handleOpen, handleClose, triggerRef, contentRef }
}

export default usePopover

const calculatePopoverPosition = (
  triggerRect: DOMRect,
  contentRect: DOMRect,
  anchorOrigin: AnchorOrigin
): PopoverPosition => {
  let top: number | undefined
  let left: number | undefined

  switch (anchorOrigin.vertical) {
    case 'top':
      top = triggerRect.top - contentRect.height
      break
    case 'bottom':
      top = triggerRect.bottom
      break
  }

  switch (anchorOrigin.horizontal) {
    case 'left':
      left = triggerRect.left
      break
    case 'right':
      left = triggerRect.right - contentRect.width
      break
  }

  return { top, left }
}
