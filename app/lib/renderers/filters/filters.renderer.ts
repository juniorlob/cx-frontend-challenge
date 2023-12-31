import { FilterRenderFunction } from '@/lib/components/shared/filter/filter.types'
import { FILTERS } from '@/lib/constants/filters.constants'
import { FiltersType } from '@/lib/models/types/filters.type'
import { filterItemRenderer } from '@/lib/renderers'

const filtersRenderers: Record<FiltersType, FilterRenderFunction[]> = {
  [FILTERS.PRICE]: [filterItemRenderer.links],
}
export default filtersRenderers
