import { FilterRenderFunction } from '@/lib/components/shared/filter/filter.types'
import { FILTERS } from '@/lib/constants/filters.constants'
import filterItemRenderer from '@/lib/renderers/filter-item/filter-item.renderer'
import { FiltersType } from '@/store/features/search/search.types'

const filtersRenderers: Record<FiltersType, FilterRenderFunction[]> = {
  [FILTERS.PRICE]: [filterItemRenderer.links, filterItemRenderer.range],
}
export default filtersRenderers
