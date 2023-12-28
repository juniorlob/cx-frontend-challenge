import { ProductType } from '@/lib/models/types/product.type'
import { SortType } from '@/lib/models/types/sort.type'

export type SearchType = {
  results: ProductType[]
  sort: SortType
  available_sorts: SortType[]
}
