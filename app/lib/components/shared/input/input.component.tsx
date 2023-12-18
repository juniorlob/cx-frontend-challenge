import styles from './input.module.css'
import { InputProps } from './input.types'

const Input = ({ endAdornment, name, onChange }: InputProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ [name]: event.target.value })
  }

  return (
    <div className={styles.wrapper}>
      <input
        name={name}
        type="text"
        onChange={handleChange}
        className={styles.input}
      />
      {endAdornment && (
        <div className={styles.endAdornment}>{endAdornment}</div>
      )}
    </div>
  )
}
export default Input
