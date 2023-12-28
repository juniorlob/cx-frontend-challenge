import { useContext, useEffect } from 'react'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { Product } from '@/lib/models/classes/product.model'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import {
  ProductFilter,
  ProductListHookTypes,
} from '@/lib/contexts/product-list/product-list.types'
import { useDebounce } from '@/lib/hooks/use-debounce.hook'
import { sortByKey } from '@/lib/utils/array.utils'

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
  initialData,
  initialFilters,
}: ProductListHookTypes) => {
  const {
    products,
    onFiltersChange: handleFiltersChange,
    refetch,
    sort: { available, current },
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
      initialData?.results.map((product) => [product.id, new Product(product)])
    )

  const onFiltersChange = (filters: ProductFilter) => {
    handleFiltersChange({ ...initialFilters, ...filters })
  }

  const sortOptions = available && sortByKey(available, 'id')?.reverse()

  return {
    products: productsList,
    filters: { ...initialFilters, ...filters },
    sort: { available: sortOptions || [], current },
    onFiltersChange,
    refetch,
  }
}
