export type FilterValueType = {
  id: string
  name: string
  results?: number
}

export type FilterRangeType = {
  type: 'range'
}

export type AnyFilterType = FilterRangeType

export type FilterType = AnyFilterType & {
  id: string
  name: string
  values: FilterValueType[]
}
