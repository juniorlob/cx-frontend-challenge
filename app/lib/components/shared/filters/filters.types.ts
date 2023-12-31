import { ContextFilters } from '@/lib/contexts/product-list/product-list.types'

export type FiltersProps = {
  onFilterChange?: (data: { [key: string]: string }) => void
  filters: ContextFilters
}
