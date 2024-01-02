import React, { useState } from 'react'
import Button from '@/lib/components/shared/button'
import { BUTTON_VARIANTS } from '@/lib/components/shared/button/button.constants'
import { ICONS } from '@/lib/constants/icons.constants'
import { FilterRenderFunctionProps } from '@/lib/components/shared/filter/filter.types'
import { RANGE_FILTER_PATTERN } from '@/lib/components/shared/filter-range/filter-range.constants'
import RangeInput from '@/lib/components/shared/input-range/input-range.component'
import styles from './filter-range.module.css'
import { RangeInputState } from '@/lib/components/shared/input-range/input-range.types'
import { rangeValueBuilder } from '@/lib/components/shared/filter-range/filter-range.utils'

const FilterRange = ({ filter, setFilter }: FilterRenderFunctionProps) => {
  const [filterValue, setFilterValue] = useState<RangeInputState>()

  const isDisabled = !filterValue?.min && !filterValue?.max

  const handleChange = (value: { [key: string]: RangeInputState }) => {
    setFilterValue(value.range)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (filterValue) setFilter({ [filter.id]: rangeValueBuilder(filterValue) })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.container}>
        <RangeInput
          name={filter.id}
          onChange={handleChange}
          maxPlaceholder="Máximo"
          minPlaceholder="Mínimo"
          maxProps={{ pattern: RANGE_FILTER_PATTERN.source }}
          minProps={{ pattern: RANGE_FILTER_PATTERN.source }}
        />
        <Button
          type={BUTTON_VARIANTS.ICON}
          icon={ICONS.CHEVRON_RIGHT_O}
          size="small"
          rounded="round"
          theme="primary"
          disabled={isDisabled}
          className={styles.button}
        >
          Aplicar
        </Button>
      </div>
    </form>
  )
}

export default FilterRange
