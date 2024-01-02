import { ReactNode } from 'react'

export type AnchorOrigin = {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}

export type PopoverProps = {
  children: ReactNode
  triggerContent: React.ReactElement
  anchorOrigin: AnchorOrigin
}

export type PopoverPosition = {
  top?: number
  left?: number
}
