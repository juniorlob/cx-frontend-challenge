import { FilterModel } from '@/lib/models/classes/filters.model'

export type FiltersProps = {
  onFilterChange: (data: { [key: string]: string }) => void
  filters: Map<string, FilterModel>
}
