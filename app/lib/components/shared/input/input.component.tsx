import styles from './input.module.css'
import { InputProps } from './input.types'

const Input = ({
  endAdornment,
  name,
  type,
  onChange,
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
      />
      {endAdornment && (
        <button className={styles.endAdornment}>{endAdornment}</button>
      )}
    </div>
  )
}
export default Input
