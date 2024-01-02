import { ReactElement, ReactNode } from 'react'

export type AnchorOrigin = {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}

export type PopoverProps = {
  children: ReactElement<PopoverContentChildrenProps>
  triggerContent: React.ReactElement
  anchorOrigin?: AnchorOrigin
  onStateChange?: (open: boolean) => void
}

export type PopoverPosition = {
  top?: number
  left?: number
}

export type PopoverContentChildrenProps = {
  onRequestClose?: () => void
}
export type PopoverContentProps = {
  children: React.ReactElement<PopoverContentChildrenProps>
  closePopover?: () => void
  ref: React.Ref<HTMLDivElement>
}
