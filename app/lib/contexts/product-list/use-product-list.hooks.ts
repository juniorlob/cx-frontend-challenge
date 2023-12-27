import { useContext, useEffect } from 'react'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { Product } from '@/lib/models/classes/product.model'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import {
  ProductFilter,
  ProductListHookTypes,
} from '@/lib/contexts/product-list/product-list.types'
import { useDebounce } from '@/lib/hooks/use-debounce.hook'

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

  const debounceUpdateQueryParams = useDebounce(filters, 300)

  useEffect(() => {
    updateQueryParams(debounceUpdateQueryParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceUpdateQueryParams])

  const productsList =
    (products?.size && products.size > 0 && products) ||
    new Map(
      initialProducts?.map((product) => [product.id, new Product(product)])
    )

  const onFiltersChange = (filters: ProductFilter) => {
    handleFiltersChange({ ...initialFilters, ...filters })
  }

  return {
    products: productsList || initialProducts,
    filters: { ...initialFilters, ...filters },
    onFiltersChange,
    refetch,
  }
}
