import React, { useState } from 'react'
import styles from './dropdown.module.css' // Update with your CSS module path
import {
  DropdownListProps,
  DropdownOption,
  DropdownProps,
} from '@/lib/components/shared/dropdown/dropdown.types'
import { cx } from '@/lib/utils/class-name.utils'
import Popover from '@/lib/components/shared/popover'

const DropdownList = ({ options, onClick, selected }: DropdownListProps) => {
  return (
    <ul className={styles.dropdownList}>
      {options?.map((option: DropdownOption) => {
        const isActive = option.id === selected
        return (
          <li
            key={option.id}
            role="option"
            aria-selected={isActive}
            className={cx(styles.listItem, isActive && styles.listItemActive)}
            {...(!isActive && { onClick: () => onClick(option.id) })}
          >
            {option.name}
          </li>
        )
      })}
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

  const handleChange = (value: string) => {
    onChange?.({ [name]: value })
    setSelected(value)
  }

  const currentItemName =
    options.find((option) => option.id === selected)?.name || ''

  return (
    <div className={styles.dropdownWrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        triggerContent={
          <button className={styles.button}>{currentItemName}</button>
        }
      >
        <DropdownList
          selected={selected}
          onClick={handleChange}
          options={options}
        />
      </Popover>
    </div>
  )
}

export default Dropdown
