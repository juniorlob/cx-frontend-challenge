import { InputSize } from '@/lib/types/input.types'

export type RangeInputProps = {
  onChange?: (data: { [key: string]: RangeInputState }) => void
  minPlaceholder?: string
  maxPlaceholder?: string
  size?: InputSize
  name: string
  minProps?: React.InputHTMLAttributes<HTMLInputElement>
  maxProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export type RangeInputState = {
  min: string
  max: string
}

export type RangeInputAction =
  | { type: 'setMin'; value: string }
  | { type: 'setMax'; value: string }
