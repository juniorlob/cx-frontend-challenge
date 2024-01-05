import { FilterType } from '@/store/features/search/search.types'

export type SetFilterType = (filter: Record<string, string>) => void

export type FilterRenderFunctionProps = {
  filter: FilterType
  setFilter: SetFilterType
}

export type FilterRenderFunction = ({
  filter,
  setFilter,
}: FilterRenderFunctionProps) => React.ReactNode

export type FilterProps = {
  filter: FilterType
  setFilter: SetFilterType
  renderFunctions: FilterRenderFunction[]
}
