import { Product } from '@/lib/models/classes/product.model'
import { SearchType } from '@/lib/models/types/search.type'
import { SortType } from '@/lib/models/types/sort.type'

export type ProductListContextProps = {
  children: React.ReactNode
}

export type SortOptions = {
  current?: SortType
  available?: SortType[]
}

export type ContextValue = {
  products?: Map<string, Product> | null
  error: Error | null
  sort: SortOptions
  onFiltersChange: (filter: Partial<ProductFilter>) => void
  refetch: () => void
  filters: ProductFilter
}

export type ProductListHookTypes = {
  initialData?: SearchType
  initialFilters?: ProductFilter
}

export type ProductFilter = {
  q?: string
}
