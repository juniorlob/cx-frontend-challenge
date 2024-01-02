import FilterLinks from '@/lib/components/shared/filter-links'
import { FilterRenderFunction } from '@/lib/components/shared/filter/filter.types'
import FilterRange from '@/lib/components/shared/filter-range'

const filterItemRenderer: Record<string, FilterRenderFunction> = {
  links: FilterLinks,
  range: FilterRange,
}

export default filterItemRenderer
