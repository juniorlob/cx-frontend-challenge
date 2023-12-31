import { FilterModel } from '@/lib/models/classes/filters.model'

export type SetFilterType = (filter: Record<string, string>) => void

export type FilterRenderFunctionProps = {
  filter: FilterModel
  setFilter: SetFilterType
}

export type FilterRenderFunction = ({
  filter,
  setFilter,
}: FilterRenderFunctionProps) => React.ReactNode

export type FilterProps = {
  filter: FilterModel
  setFilter: SetFilterType
  renderFunctions: FilterRenderFunction[]
}
