import { FilterLink } from '@/lib/components/shared'
import { FilterRenderFunctionProps } from '@/lib/components/shared/filter/filter.types'

const FilterLinks = ({
  filter,
  setFilter,
}: FilterRenderFunctionProps): JSX.Element[] =>
  Array.from(filter.values.values()).map((value) => (
    <FilterLink key={value.id} value={value} setFilter={setFilter} />
  ))

export default FilterLinks
