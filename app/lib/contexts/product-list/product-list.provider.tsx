import useDebouncedSearch from '@/lib/hooks/use-debounced-search.hook'
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

const ProductListProvider = ({
  children,
  ssrData,
}: ProductListContextProps) => {
  const ssrSearchData = new Search(ssrData)

  const { data, error, onParamsChange, params } = useDebouncedSearch<
    ProductQueryParams | undefined,
    SearchType
  >(ssrSearchData.queryParams(), productRequests[ROUTE_TYPES.SEARCH], 300)

  const clientSideData = data && new Search(data)

  const searchData = clientSideData || ssrSearchData

  const value: ContextValue = {
    products: searchData.results,
    error,
    sort: searchData.sortOptions,
    onParamsChange: (params: ProductQueryParams) => onParamsChange(params),
    refetch: () => onParamsChange({}),
    queryParams: params,
    query: searchData.query,
    filters: searchData.filtersOptions(),
  }

  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductListProvider
