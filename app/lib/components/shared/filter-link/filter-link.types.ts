import { SetFilterType } from '@/lib/components/shared/filter/filter.types'
import { FilterValueModel } from '@/lib/models/classes/filters.model'

export type FilterLinkProps = {
  value: FilterValueModel
  setFilter: SetFilterType
}
