import { Product } from '@/lib/models/search.model'

export type ProductListContextProps = {
  children: React.ReactNode
}

export type ContextValue = {
  products: Map<string, Product> | null
  error: Error | null
  onFiltersChange: (filter: Partial<{}>) => void
  refetch: () => void
}
