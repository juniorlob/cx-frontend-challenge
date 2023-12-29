import { FilterType } from '@/lib/models/types/filters.type'
import { PagingType } from '@/lib/models/types/pagging.type'
import { ProductType } from '@/lib/models/types/product.type'
import { SortType } from '@/lib/models/types/sort.type'

export type SearchType = {
  results: ProductType[]
  sort: SortType
  available_sorts: SortType[]
  available_filters: FilterType[]
  filters: FilterType[] | undefined
  query: string | undefined
  paging: PagingType
}
