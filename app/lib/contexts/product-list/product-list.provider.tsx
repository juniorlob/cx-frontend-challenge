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

const ProductListProvider = ({ children }: ProductListContextProps) => {
  const { data, error, onParamsChange, params } = useDebouncedSearch<
    ProductQueryParams | undefined,
    SearchType
  >({}, productRequests[ROUTE_TYPES.SEARCH], 300)
  const searchData = data && new Search(data as SearchType)

  const value: ContextValue = {
    products: searchData?.results || null,
    error,
    sort: searchData?.sortOptions,
    onParamsChange: (params: ProductQueryParams) => onParamsChange(params),
    refetch: () => onParamsChange({}),
    queryParams: params || searchData?.queryParams(),
    query: searchData?.query,
    filters: searchData?.filtersOptions(),
  }

  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductListProvider
