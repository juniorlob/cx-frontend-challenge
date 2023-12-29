import { useContext, useEffect } from 'react'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import { ProductQueryParams } from '@/lib/contexts/product-list/product-list.types'
import { useDebounce } from '@/lib/hooks/use-debounce.hook'
import { searchValidParams } from '@/lib/utils/url.utils'

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
  const {
    products,
    onParamsChange: paramsHandleChange,
    sort,
    query,
    queryParams,
    filters,
  } = useProductListContext()

  const updateQueryParams = useUpdateQueryParams()

  const debounceUpdateQueryParams = useDebounce(queryParams, 300)

  useEffect(() => {
    if (debounceUpdateQueryParams) updateQueryParams(debounceUpdateQueryParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceUpdateQueryParams])

  const onParamsChange = (params: Partial<ProductQueryParams>) => {
    paramsHandleChange(searchValidParams(params))
  }
  return {
    products,
    sort: sort,
    query: query,
    filters: filters,
    onParamsChange,
  }
}
