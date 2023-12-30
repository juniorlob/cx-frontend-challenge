import { useContext } from 'react'
import { ProductsListContext } from '@/lib/contexts/product-list/products-list.context'
import { ProductQueryParams } from '@/lib/contexts/product-list/product-list.types'
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
    filters,
  } = useProductListContext()

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
