import { ProductsListContext } from './products-list.context'
import { ProductFilter, ProductListContextProps } from './product-list.types'
import useDebouncedSearch from '@/lib/hooks/use-debounced-search.hook'
import { productRequests } from '@/lib/services/product-list-requests.service'
import { SearchType } from '@/lib/models/types/search.type'
import { ProductType } from '@/lib/models/types/product.type'
import { Product } from '@/lib/models/classes/product.model'

const ProductListProvider = ({ children }: ProductListContextProps) => {
  const { data, error, onFiltersChange, filters } = useDebouncedSearch<
    ProductFilter,
    SearchType
  >({}, productRequests.search, 300)

  const value = {
    products: new Map(
      data?.results?.map((product: ProductType) => [
        product.id,
        new Product(product),
      ])
    ),
    error,
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
