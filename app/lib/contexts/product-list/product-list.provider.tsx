import { ProductsListContext } from './products-list.context'
import { ProductFilter, ProductListContextProps } from './product-list.types'
import useDebouncedSearch from '@/lib/hooks/use-debounced-search.hook'
import { Product, ProductType, SearchType } from '@/lib/models/search.model'
import { productRequests } from '@/lib/services/product-list-requests.service'

const ProductListProvider = ({ children }: ProductListContextProps) => {
  const { data, error, onFiltersChange } = useDebouncedSearch<
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
  }
  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductListProvider
