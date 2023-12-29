import { InputProps } from '@/lib/components/shared/input/input.types'
import styles from './input.module.css'

const Input = ({
  endAdornment,
  name,
  type,
  onChange,
  defaultValue,
  placeholder,
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
        className={styles.input}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
