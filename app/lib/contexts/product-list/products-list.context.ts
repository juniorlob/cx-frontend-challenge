import { createContext } from 'react'
import { ContextValue } from './product-list.types'
import { Product } from '@/lib/models/search.model'

export const ProductsListContext = createContext<ContextValue>({
  products: new Map(),
  error: null,
  onFiltersChange: () => {},
  refetch: () => {},
})
