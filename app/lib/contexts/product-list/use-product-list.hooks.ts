import { useContext, useEffect } from 'react'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { Product } from '@/lib/models/classes/product.model'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import {
  ProductQueryParams,
  ProductListHookTypes,
} from '@/lib/contexts/product-list/product-list.types'
import { useDebounce } from '@/lib/hooks/use-debounce.hook'
import { Search } from '@/lib/models/classes/search.model'
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

export const useProductsList = ({ initialData }: ProductListHookTypes) => {
  const {
    products,
    onParamsChange: paramsHandleChange,
    refetch,
    sort,
    query,
    queryParams,
  } = useProductListContext()

  const initialSearchData = new Search(initialData)
  const ssrQueryParams = queryParams || initialSearchData?.queryParams()

  const updateQueryParams = useUpdateQueryParams()

  const debounceUpdateQueryParams = useDebounce(ssrQueryParams, 300)

  useEffect(() => {
    updateQueryParams(debounceUpdateQueryParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceUpdateQueryParams])

  const productsList = products || initialSearchData.results
  const onParamsChange = (params: Partial<ProductQueryParams>) => {
    paramsHandleChange(searchValidParams({ ...ssrQueryParams, ...params }))
  }

  return {
    products: productsList,
    sort: sort || initialSearchData?.sortOptions,
    query: query || initialSearchData?.query,
    onParamsChange,
  }
}
