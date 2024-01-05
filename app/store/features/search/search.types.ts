import { FILTERS, FILTERS_TYPE } from '@/lib/constants/filters.constants'

export type SearchState = Pick<
  GetSearchType,
  | 'available_filters'
  | 'filters'
  | 'available_sorts'
  | 'sort'
  | 'query'
  | 'paging'
> & {
  products: ProductState[]
  error?: Error
  loading?: boolean
}

export type ProductState = Pick<
  ProductType,
  'id' | 'title' | 'installments' | 'address' | 'condition'
> & {
  free_shipping: boolean
  picture: string
  price: PriceState
}

export type PriceState = {
  currency: string
  amount: string | number
  decimals: number
}

export type GetSearchType = {
  results: ProductType[]
  sort?: SortType
  available_sorts: SortType[]
  available_filters: FilterType[]
  filters: FilterType[] | []
  query?: string
  paging?: PagingType
}

export type ProductType = {
  id: string
  title: string
  condition: string | undefined
  thumbnail: string
  price: number | string
  shipping: ShippingType
  installments: InstallmentsType
  currency_id: string
  attributes: AttributeType[]
  address: AddressType
}

export type ShippingType = {
  free_shipping: boolean
}

export type InstallmentsType = {
  quantity: number
  amount: number
}

export type SortType = {
  id: string
  name: string
}

export type FilterValueType = {
  id: string
  name: string
  results?: number
  active: boolean
  filterId: string
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

export type PagingType = {
  limit: number
}

export type AttributeType = {
  id: string
  name: string
  value_name: string
}

export type AddressType = {
  state_name: string
  city_name: string
}

export type SearchQueryParams = {
  q?: string
  sort?: string
  price?: string
  limit?: number
}

export type SearchParamsValidatorType = {
  readonly sort: (value: unknown) => void
  readonly price: (value: unknown) => boolean
  readonly q: (value: unknown) => void
  readonly limit: (value: unknown) => void
  [key: string]: (value: unknown) => void | boolean
}
