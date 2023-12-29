import { INITIAL_STATE_CONTEXT } from '@/lib/contexts/product-list/product-list.constants'
import { ContextValue } from '@/lib/contexts/product-list/product-list.types'
import { createContext } from 'react'

export const ProductsListContext = createContext<ContextValue>(
  INITIAL_STATE_CONTEXT
)
