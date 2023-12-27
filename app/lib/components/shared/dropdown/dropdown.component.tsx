import { DropdownProps } from '@/lib/components/shared/dropdown/dropdown.types'
import styles from './dropdown.module.css'

export const Dropdown = ({
  options,
  onChange,
  defaultValue,
  label,
  name,
}: DropdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.({ [name]: event.target.value })
  }
  return (
    <div className={styles.sortOrderSelect}>
      {label && <label>{label}</label>}
      <select
        name={name}
        className={styles.select}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className={styles.iconWrapper}></div>
    </div>
  )
}

export default Dropdown
