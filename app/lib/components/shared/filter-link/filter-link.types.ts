import { SetFilterType } from '@/lib/components/shared/filter/filter.types'
import { getMergedFilterOptions } from '@/store/features/search'

export type FilterLinkProps = {
  value: ReturnType<typeof getMergedFilterOptions>[number]['values'][number]
  setFilter: SetFilterType
}
