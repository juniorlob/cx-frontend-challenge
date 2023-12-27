import { Product } from '@/lib/models/classes/product.model'
import { ProductType } from '@/lib/models/types/product.type'

export type ProductListContextProps = {
  children: React.ReactNode
}

export type ContextValue = {
  products: Map<string, Product> | null
  error: Error | null
  onFiltersChange: (filter: Partial<ProductFilter>) => void
  refetch: () => void
  filters: ProductFilter
}

export type ProductListHookTypes = {
  initialProducts: ProductType[]
  initialFilters: ProductFilter
}

export type ProductFilter = {
  q?: string
}
