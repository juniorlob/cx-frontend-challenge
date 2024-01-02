import { RangeInputState } from '@/lib/components/shared/input-range/input-range.types'

export const rangeValueBuilder = (value: RangeInputState): string => {
  const min = value.min || '*'
  const max = value.max || '*'
  return `${min}-${max}`
}
