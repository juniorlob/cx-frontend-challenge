export type DropdownOption = {
  id: string
  name: string
}

export type DropdownProps = {
  options: DropdownOption[]
  onChange?: (data: { [key: string]: string }) => void
  defaultValue: string
  name: string
  label?: string
}
