import { Product } from '@/lib/models/classes/product.model'
import { ProductType } from '@/lib/models/types/product.type'

export const DEFAULT_PRODUCT_FILTERS = {
  limit: Number(process.env.NEXT_PUBLIC_MELI_QUERY_LIMIT) || 10,
}

const INITIAL_PRODUCTS: ProductType[] = []

export const INITIAL_STATE_CONTEXT = {
  products: new Map(
    INITIAL_PRODUCTS.map((product) => [product.id, new Product(product)])
  ),
  error: null,
  onParamsChange: () => {},
  refetch: () => {},
  sort: {
    available: [],
  },
  queryParams: {},
  query: undefined,
  filters: {},
}
