import React, { useState, forwardRef, cloneElement } from 'react'
import { createPortal } from 'react-dom'
import useOutsideClickHandler from '@/lib/hooks/use-outside-click.hook'
import useBodyScrollLock from '@/lib/hooks/use-body-scroll-lock.hook'
import { cx } from '@/lib/utils/class-name.utils'
import usePopover from '@/lib/hooks/use-popover.hook'
import {
  PopoverContentChildrenProps,
  PopoverContentProps,
  PopoverProps,
} from '@/lib/components/shared/popover/popover.types'
import styles from './popover.module.css'

const Popover = ({
  children,
  triggerContent,
  onStateChange,
  anchorOrigin = { vertical: 'top', horizontal: 'left' },
}: PopoverProps) => {
  const { open, handleOpen, handleClose, triggerRef, contentRef } = usePopover({
    anchorOrigin,
    onStateChange,
  })

  useBodyScrollLock(open)
  useOutsideClickHandler<HTMLButtonElement | HTMLDivElement>(
    [contentRef, triggerRef],
    () => handleClose()
  )

  const cloneTriggerElement = cloneElement(
    triggerContent as React.ReactElement,
    {
      onClick: handleOpen,
      ref: triggerRef,
      className: cx(triggerContent?.props?.className, styles.trigger),
    }
  )

  return (
    <div className={styles.popoverWrapper}>
      {cloneTriggerElement}
      {open &&
        triggerRef?.current?.parentElement &&
        createPortal(
          <PopoverContent ref={contentRef} closePopover={handleClose}>
            {children}
          </PopoverContent>,
          triggerRef.current.parentElement
        )}
    </div>
  )
}

export default Popover

const PopoverContent: React.FC<PopoverContentProps> = React.forwardRef(
  function PopoverContent({ children, closePopover }, ref) {
    const handleClose = () => {
      closePopover?.()
    }

    return (
      <div className={cx(styles.popoverContent)} ref={ref}>
        {React.isValidElement<PopoverContentChildrenProps>(children) &&
          React.cloneElement(children, { onRequestClose: handleClose })}
      </div>
    )
  }
)
