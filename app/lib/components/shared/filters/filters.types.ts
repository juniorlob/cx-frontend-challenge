import { FilterType } from '@/store/features/search/search.types'

export type FiltersProps = {
  onFilterChange?: (data: { [key: string]: string }) => void
  filters: FilterType[]
}
