import FilterLinks from '@/lib/components/shared/filter-links'
import { FilterRenderFunction } from '@/lib/components/shared/filter/filter.types'

const filterItemRenderer: Record<string, FilterRenderFunction> = {
  links: FilterLinks,
}

export default filterItemRenderer
