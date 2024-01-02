import { FilterModel } from '@/lib/models/classes/filters.model'
import { Product } from '@/lib/models/classes/product.model'
import { SearchType } from '@/lib/models/types/search.type'
import { SortType } from '@/lib/models/types/sort.type'

export type ProductListContextProps = {
  children: React.ReactNode
  ssrData: SearchType
}

export type SortOptions = {
  current?: SortType
  available?: SortType[]
}

export type ContextFilters = Map<string, FilterModel>

export type ContextValue = {
  products: Map<string, Product>
  error: Error | null
  sort: SortOptions | undefined
  onParamsChange: (params: Partial<ProductQueryParams>) => void
  query?: string
  filters: ContextFilters
}

export type ProductListHookTypes = {
  initialData: SearchType
}

export type ProductQueryParams = {
  q?: string
  sort?: string
  price?: string
  limit?: number
}
