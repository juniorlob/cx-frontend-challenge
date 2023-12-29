import { ContextValue } from '@/lib/contexts/product-list/product-list.types'
import { createContext } from 'react'

export const ProductsListContext = createContext<ContextValue>({
  products: null,
  error: null,
  onParamsChange: () => {},
  refetch: () => {},
  sort: {
    available: [],
  },
  queryParams: {},
  query: undefined,
})
