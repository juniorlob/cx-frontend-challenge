import { ProductsListContext } from './products-list.context'
import { ProductListContextProps } from './product-list.types'
import useDebouncedSearch from '@/lib/hooks/use-debounced-search'
import { Product, ProductType } from '@/lib/models/search.model'
import { productRequests } from '@/lib/services/product-list.requests'

const ProductListProvider = ({ children }: ProductListContextProps) => {
  const { data, error, onFiltersChange } = useDebouncedSearch(
    {},
    productRequests.search,
    300
  )

  const value = {
    products: new Map(
      data?.results?.map((product: ProductType) => [
        product.id,
        new Product(product),
      ])
    ),
    error,
    onFiltersChange,
    refetch: () => onFiltersChange({}),
  }
  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductListProvider
