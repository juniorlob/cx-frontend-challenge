import { useContext } from 'react'
import { ProductsListContext } from './products-list.context'

const useProductListContext = () => {
  const productListContext = useContext(ProductsListContext)

  if (!productListContext) {
    throw new Error(
      'useProductListContext must be used within a ProductListProvider'
    )
  }

  return productListContext
}

export const useProductsList = () => {
  const { products, onFiltersChange, refetch } = useProductListContext()

  return { products, onFiltersChange, refetch }
}
