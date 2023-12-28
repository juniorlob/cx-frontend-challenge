import {
  DropdownOption,
  DropdownProps,
} from '@/lib/components/shared/dropdown/dropdown.types'
import styles from './dropdown.module.css'
import { useRef, useState } from 'react'
import { cx } from '@/lib/utils/class-name.utils'
import { createPortal } from 'react-dom'
import useBodyScrollLock from '@/lib/hooks/use-body-scroll-lock.hook'
import useOutsideClickHandler from '@/lib/hooks/use-outside-click.hook'

const DropdownList = ({
  options,
  onClick,
  selected,
}: Partial<DropdownProps> & {
  onClick: (value: string) => void
  selected: string
}) => {
  return (
    <ul className={styles.dropdownList}>
      {options?.map((option: DropdownOption, index) => (
        <li
          role="option"
          aria-selected={selected === option.id}
          className={cx(
            styles.listItem,
            selected === option.id && styles.listItemActive
          )}
          {...(selected !== option.id && { onClick: () => onClick(option.id) })}
          key={option.id}
        >
          {option.name}
        </li>
      ))}
    </ul>
  )
}

const Dropdown = ({
  options,
  onChange,
  defaultValue,
  label,
  name,
}: DropdownProps) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue)
  const [open, setOpen] = useState<boolean>(false)
  useBodyScrollLock(open)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useOutsideClickHandler(buttonRef, () => setOpen(false))

  const handleChange = (value: string) => {
    onChange?.({ [name]: value })
    setSelected(value)
    setOpen(false)
  }
  const currentItemName =
    options.find((option) => option.id === selected)?.name || ''

  return (
    <div className={styles.dropdownWrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.dropdown}>
        <button
          aria-haspopup={true}
          aria-labelledby={currentItemName}
          className={cx(styles.button, open && styles.buttonOpen)}
          ref={buttonRef}
          onClick={() => setOpen(!open)}
        >
          {currentItemName}
        </button>
        {open &&
          buttonRef?.current?.parentElement &&
          createPortal(
            <DropdownList
              selected={selected}
              onClick={handleChange}
              options={options}
            />,
            buttonRef.current.parentElement
          )}
      </div>
    </div>
  )
}

export default Dropdown
