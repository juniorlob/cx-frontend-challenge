import { BUTTON_VARIANTS } from '@/lib/components/shared/button/button.constants'
import { ICONS } from '@/lib/constants/icons.constants'
import { InputSize } from '@/lib/types/input.types'
import { BorderRadius, ThemeColors } from '@/lib/types/theme.types'

export type ButtonProps = {
  type: (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
  icon?: (typeof ICONS)[keyof typeof ICONS]
  size?: InputSize
  children: React.ReactNode | string
  rounded?: BorderRadius
  theme: ThemeColors
  disabled?: boolean
  className?: string
}

export type ButtonVariants = Record<
  string,
  {
    content: React.ReactNode
    attributes: React.ButtonHTMLAttributes<HTMLButtonElement>
  }
>
