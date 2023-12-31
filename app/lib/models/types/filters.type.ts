import { FILTERS, FILTERS_TYPE } from '@/lib/constants/filters.constants'

export type FilterValueType = {
  id: string
  name: string
  results?: number
}

export type FiltersType = (typeof FILTERS)[keyof typeof FILTERS]

export type FilterTypes = (typeof FILTERS_TYPE)[keyof typeof FILTERS_TYPE]

export type FilterRangeType = {
  type: FilterTypes
}

export type AnyFilterType = FilterRangeType

export type FilterType = AnyFilterType & {
  id: string
  name: string
  values: FilterValueType[]
}
