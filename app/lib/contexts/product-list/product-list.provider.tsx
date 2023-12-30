import useDebouncedRequest from '@/lib/hooks/use-debounced-request.hook'
import {
  ROUTE_TYPES,
  productRequests,
} from '@/lib/services/product-list-requests.service'
import { SearchType } from '@/lib/models/types/search.type'

import {
  ContextValue,
  ProductQueryParams,
  ProductListContextProps,
} from '@/lib/contexts/product-list/product-list.types'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import { Search } from '@/lib/models/classes/search.model'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { useEffect } from 'react'

const ProductListProvider = ({
  children,
  ssrData,
}: ProductListContextProps) => {
  const updateQueryParams = useUpdateQueryParams()
  const ssrSearchData = new Search(ssrData)

  const { data, error, debouncedParams, onParamsChange } =
    useDebouncedRequest<SearchType>(
      ssrSearchData.queryParams(),
      productRequests[ROUTE_TYPES.SEARCH],
      300
    )

  const clientSideData = data && new Search(data)

  const searchData = clientSideData || ssrSearchData

  const value: ContextValue = {
    products: searchData.results,
    error,
    sort: searchData.sortOptions,
    onParamsChange: (params: ProductQueryParams) => onParamsChange(params),
    query: searchData.query,
    filters: searchData.filtersOptions(),
  }

  useEffect(() => {
    updateQueryParams(debouncedParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams])

  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductListProvider
