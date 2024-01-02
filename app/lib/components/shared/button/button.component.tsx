import React from 'react'
import { BUTTON_VARIANTS } from '@/lib/components/shared/button/button.constants'
import {
  ButtonProps,
  ButtonVariants,
} from '@/lib/components/shared/button/button.types'
import iconStyles from '@/lib/styles/icons.module.css'
import styles from './button.module.css'
import { cx } from '@/lib/utils/class-name.utils'

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  size,
  icon,
  rounded,
  theme,
  disabled,
  className,
  buttonProps,
}) => {
  const commonClasses = cx(
    styles.button,
    size && styles[size],
    styles[`${rounded}Rounded`],
    theme && styles[theme],
    className
  )
  const buttonVariants: ButtonVariants = {
    [BUTTON_VARIANTS.ICON]: {
      content: (
        <span
          className={cx(
            styles.icon,
            size && styles[`${size}Icon`],
            icon && iconStyles[icon]
          )}
        ></span>
      ),
      attributes: {
        className: cx(styles.iconButton, commonClasses),
        ...(typeof children === 'string' && { 'aria-label': children }),
      },
    },
  }

  return (
    <button
      disabled={disabled}
      {...buttonVariants[type].attributes}
      {...buttonProps}
    >
      {buttonVariants[type].content}
    </button>
  )
}

export default Button
