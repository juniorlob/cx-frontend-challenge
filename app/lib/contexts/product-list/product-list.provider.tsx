import useDebouncedSearch from '@/lib/hooks/use-debounced-search.hook'
import { productRequests } from '@/lib/services/product-list-requests.service'
import { SearchType } from '@/lib/models/types/search.type'
import { ProductType } from '@/lib/models/types/product.type'
import { Product } from '@/lib/models/classes/product.model'
import {
  ContextValue,
  ProductFilter,
  ProductListContextProps,
} from '@/lib/contexts/product-list/product-list.types'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import { Search } from '@/lib/models/classes/search.model'

const ProductListProvider = ({ children }: ProductListContextProps) => {
  const { data, error, onFiltersChange, filters } = useDebouncedSearch<
    ProductFilter,
    SearchType
  >({}, productRequests.search, 300)

  const searchData = data && new Search(data)

  const value: ContextValue = {
    products: searchData?.results,
    error,
    sort: {
      available:
        searchData && [searchData.sort].concat(...searchData.availableSorts),
      current: searchData?.sort,
    },
    onFiltersChange: (filters: ProductFilter) => onFiltersChange(filters),
    refetch: () => onFiltersChange({}),
    filters,
  }
  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductListProvider
