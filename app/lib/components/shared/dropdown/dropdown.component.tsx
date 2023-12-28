import {
  DropdownListProps,
  DropdownOption,
  DropdownProps,
} from '@/lib/components/shared/dropdown/dropdown.types'
import styles from './dropdown.module.css'
import { forwardRef, useRef, useState } from 'react'
import { cx } from '@/lib/utils/class-name.utils'
import { createPortal } from 'react-dom'
import useBodyScrollLock from '@/lib/hooks/use-body-scroll-lock.hook'
import useOutsideClickHandler from '@/lib/hooks/use-outside-click.hook'

const DropdownList = forwardRef(function DropdownList(
  { options, onClick, selected }: DropdownListProps,
  ref: React.Ref<HTMLUListElement>
) {
  return (
    <ul className={styles.dropdownList} ref={ref}>
      {options?.map((option: DropdownOption) => (
        <li
          key={option.id}
          role="option"
          aria-selected={selected === option.id}
          className={cx(
            styles.listItem,
            selected === option.id && styles.listItemActive
          )}
          onClick={() => onClick(option.id)}
        >
          {option.name}
        </li>
      ))}
    </ul>
  )
})
DropdownList.displayName = 'DropdownList'

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
  const listRef = useRef<HTMLUListElement>(null)
  useOutsideClickHandler(listRef, () => setOpen(false))

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
              ref={listRef}
            />,
            buttonRef.current.parentElement
          )}
      </div>
    </div>
  )
}

export default Dropdown
