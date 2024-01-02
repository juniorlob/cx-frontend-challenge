import { InputSize, InputVariant } from '@/lib/types/input.types'
import { ThemeColors } from '@/lib/types/theme.types'

export type InputProps = {
  endAdornment?: React.ReactNode
  onChange?: (data: { [key: string]: string }) => void
  name: string
  type: string
  size?: InputSize
  variant?: InputVariant
  theme?: ThemeColors
  defaultValue?: string
  placeholder?: string
  className?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}
