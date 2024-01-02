import { InputProps } from '@/lib/components/shared/input/input.types'
import styles from './input.module.css'
import { cx } from '@/lib/utils/class-name.utils'
import {
  DEFAULT_SIZE,
  DEFAULT_THEME,
  DEFAULT_VARIANT,
} from '@/lib/components/shared/input/input.constants'

const Input = ({
  endAdornment,
  name,
  type,
  onChange,
  defaultValue,
  placeholder,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  theme = DEFAULT_THEME,
  className = '',
  inputProps,
}: InputProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ [name]: event.target.value })
  }

  return (
    <div className={styles.wrapper}>
      <input
        name={name}
        type={type}
        onChange={handleChange}
        className={cx(
          styles.input,
          styles[size],
          styles[variant],
          styles[theme],
          className
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...inputProps}
      />
      {endAdornment && (
        <button type="submit" className={styles.endAdornment} aria-label={name}>
          {endAdornment}
        </button>
      )}
    </div>
  )
}
export default Input
