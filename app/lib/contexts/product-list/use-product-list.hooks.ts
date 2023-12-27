import { useContext } from 'react'
import { ProductsListContext } from './products-list.context'
import { ProductFilter, ProductListHookTypes } from './product-list.types'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { Product } from '@/lib/models/classes/product.model'

const useProductListContext = () => {
  const productListContext = useContext(ProductsListContext)

  if (!productListContext) {
    throw new Error(
      'useProductListContext must be used within a ProductListProvider'
    )
  }

  return productListContext
}

export const useProductsList = ({
  initialProducts,
  initialFilters,
}: ProductListHookTypes) => {
  const {
    products,
    onFiltersChange: handleFiltersChange,
    refetch,
    filters,
  } = useProductListContext()
  const updateQueryParams = useUpdateQueryParams()

  const productsList =
    (products?.size && products.size > 0 && products) ||
    new Map(
      initialProducts?.map((product) => [product.id, new Product(product)])
    )

  const onFiltersChange = (filters: ProductFilter) => {
    handleFiltersChange({ ...initialFilters, ...filters })
    updateQueryParams(filters)
  }

  return {
    products: productsList || initialProducts,
    filters: { ...initialFilters, ...filters },
    onFiltersChange,
    refetch,
  }
}
