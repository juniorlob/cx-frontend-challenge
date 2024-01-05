import { SearchState, SortType } from '@/store/features/search/search.types'

import {
  mergeFilter,
  searchValidParams,
  updateFilterValues,
} from '@/store/features/search/search.utils'
import { sortByKey } from '@/lib/utils/array.utils'

const getSortOptions = (state: SearchState) => {
  const availableSorts = state.sort
    ? [state.sort, ...state.available_sorts]
    : state.available_sorts

  return {
    available: sortByKey<SortType>(availableSorts, 'name')?.reverse(),
    current: state.sort,
  }
}

export const getMergedFilterOptions = (state: SearchState) => {
  const { available_filters, filters } = state

  const newFiltersMap = new Map(
    filters.map((filter) => {
      const updatedValues = updateFilterValues(filter, true)
      return [filter.id, { ...filter, values: updatedValues }]
    })
  )

  available_filters.forEach((availableFilter) => {
    const currentFilter = newFiltersMap.get(availableFilter.id)
    const mergedFilter = mergeFilter(availableFilter, currentFilter)
    newFiltersMap.set(availableFilter.id, mergedFilter)
  })

  return Array.from(newFiltersMap.values())
}

const getSearchParams = (state: SearchState) => {
  const { filters, query, paging, sort } = state

  const filterQueryParams = filters
    ? filters.map((filter) => {
        const [_, firstFilterValue] = filter.values.entries().next().value
        return [filter.id, firstFilterValue ? firstFilterValue.id : undefined]
      })
    : []

  const sortOptionId = sort?.id
  const pagingLimit = paging?.limit

  const queryParams = {
    sort: sortOptionId,
    q: query,
    limit: pagingLimit,
    ...Object.fromEntries(
      filterQueryParams.filter(([_, valueId]) => valueId !== undefined)
    ),
  }
  return searchValidParams(queryParams)
}

const getSearchQuery = (state: SearchState) => state.query
const getSearchProducts = (state: SearchState) => state.products

const searchSelectors = {
  getSortOptions,
  getMergedFilterOptions,
  getSearchParams,
  getSearchQuery,
  getSearchProducts,
}

export default searchSelectors
