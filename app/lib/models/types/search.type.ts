import { ProductType } from '@/lib/models/types/product.type'

export type SearchType = {
  site_id: string
  query: string
  paging: {
    total: number
    primary_results: number
    offset: number
    limit: number
  }
  results: ProductType[]
}
