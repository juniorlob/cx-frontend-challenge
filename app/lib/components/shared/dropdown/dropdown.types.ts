import { PopoverContentChildrenProps } from '@/lib/components/shared/popover/popover.types'

export type DropdownOption = {
  id: string
  name: string
}

export type DropdownProps = {
  options: DropdownOption[]
  onChange?: (data: { [key: string]: string }) => void
  defaultValue?: string
  name: string
  label?: string
}

export type DropdownListProps = Partial<DropdownProps> &
  PopoverContentChildrenProps & {
    onClick: (value: string) => void
    selected: string | undefined
  }
