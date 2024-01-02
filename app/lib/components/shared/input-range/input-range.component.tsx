import React, { useReducer } from 'react'
import styles from './input-range.module.css'
import Input from '@/lib/components/shared/input'
import {
  RangeInputAction,
  RangeInputProps,
  RangeInputState,
} from '@/lib/components/shared/input-range/input-range.types'
import { inputRangeReducer } from '@/lib/components/shared/input-range/input-range.utils'

const RangeInput = ({
  onChange,
  minPlaceholder,
  maxPlaceholder,
  size = 'small',
  name,
  minProps,
  maxProps,
}: RangeInputProps) => {
  const [state, dispatch] = useReducer(inputRangeReducer, { min: '', max: '' })

  const handleInputChange =
    (type: 'setMin' | 'setMax') => (data: { [key: string]: string }) => {
      const value = data[type === 'setMin' ? `${name}Min` : `${name}Max`]
      dispatch({ type, value })

      const updatedState = {
        ...state,
        [type === 'setMin' ? 'min' : 'max']: value,
      }

      onChange?.({ [name]: updatedState })
    }

  return (
    <div className={styles.container}>
      <Input
        name={`${name}Min`}
        type="text"
        onChange={handleInputChange('setMin')}
        placeholder={minPlaceholder}
        size={size}
        variant="outlined"
        theme="gray"
        className={styles.input}
        inputProps={{ ...minProps, 'aria-label': `${name}Min` }}
      />
      <span className={styles.separator}>-</span>
      <Input
        name={`${name}Max`}
        type="text"
        onChange={handleInputChange('setMax')}
        placeholder={maxPlaceholder}
        size={size}
        variant="outlined"
        theme="gray"
        className={styles.input}
        inputProps={{ ...maxProps, 'aria-label': `${name}Max` }}
      />
    </div>
  )
}

export default RangeInput
