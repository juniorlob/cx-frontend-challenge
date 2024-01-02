import { SearchType } from '@/lib/models/types/search.type'
import { Product } from '@/lib/models/classes/product.model'
import { SortType } from '@/lib/models/types/sort.type'
import { FilterModel } from '@/lib/models/classes/filters.model'
import { sortByKey } from '@/lib/utils/array.utils'
import { PagingType } from '@/lib/models/types/pagging.type'
import { searchValidParams } from '@/lib/utils/url.utils'
import { INITIAL_SEARCH } from '@/lib/contexts/product-list'

export class Search {
  private _results: Map<string, Product>
  private _sort?: SortType
  private _availableSorts: SortType[]
  private _availableFilters: Map<string, FilterModel>
  private _filters?: Map<string, FilterModel>
  private _query?: string
  private _paging?: PagingType

  constructor(searchData: SearchType) {
    const {
      results,
      sort,
      available_sorts,
      available_filters,
      filters,
      query,
      paging,
    } = searchData || INITIAL_SEARCH

    this._results = new Map(
      results.map((result) => [result.id, new Product(result)])
    )
    this._sort = sort && sort
    this._availableSorts = available_sorts
    this._availableFilters = new Map(
      available_filters.map((filter) => [
        filter.id,
        new FilterModel(filter, this),
      ])
    )
    this._filters = filters
      ? new Map(
          filters.map((filter) => [filter.id, new FilterModel(filter, this)])
        )
      : undefined
    this._query = query
    this._paging = paging
  }

  get filters() {
    return this._filters
  }

  get results() {
    return this._results.size > 0 ? this._results : new Map()
  }

  get sort() {
    return this._sort
  }

  get availableSorts() {
    return this._availableSorts
  }

  get availableFilters() {
    return this._availableFilters
  }

  get query() {
    return this._query
  }

  get sortOptions() {
    const availableSorts = this.sort
      ? [this.sort, ...this.availableSorts]
      : this.availableSorts

    return {
      available: sortByKey<SortType>(availableSorts, 'name')?.reverse(),
      current: this.sort,
    }
  }
  queryParams() {
    const filterQueryParams = this.filters
      ? Array.from(this.filters).map(([key, filter]) => {
          const [_, firstFilterValue] = filter.values.entries().next().value
          return [key, firstFilterValue ? firstFilterValue.id : undefined]
        })
      : []

    const sortOptionId = this.sortOptions?.current?.id
    const pagingLimit = this._paging?.limit

    const queryParams = {
      sort: sortOptionId,
      q: this.query,
      limit: pagingLimit,
      ...Object.fromEntries(
        filterQueryParams.filter(([_, valueId]) => valueId !== undefined)
      ),
    }
    return searchValidParams(queryParams)
  }

  filtersOptions() {
    return {
      available: this.availableFilters,
      current: this.filters,
    }
  }

  getMergedFilterOptions() {
    const mergedFilters = new Map<string, FilterModel>()

    this.availableFilters.forEach((filter) => {
      mergedFilters.set(filter.id, filter)
    })

    this.filters?.forEach((newFilter) => {
      const existingFilter = mergedFilters.get(newFilter.id)
      if (existingFilter) {
        newFilter.values.forEach((value, valueId) => {
          existingFilter.values.set(valueId, value)
        })
      } else {
        mergedFilters.set(newFilter.id, newFilter)
      }
    })

    return mergedFilters
  }
}
