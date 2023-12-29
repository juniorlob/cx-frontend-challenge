import { SearchType } from '@/lib/models/types/search.type'
import { Product } from '@/lib/models/classes/product.model'
import { SortType } from '@/lib/models/types/sort.type'
import { FilterModel } from '@/lib/models/classes/filters.model'
import { sortByKey } from '@/lib/utils/array.utils'
import { PagingType } from '@/lib/models/types/pagging.type'

export class Search {
  private _results: Map<string, Product>
  private _sort: SortType
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
    } = searchData

    this._results = new Map(
      results.map((result) => [result.id, new Product(result)])
    )
    this._sort = sort
    this._availableSorts = available_sorts
    this._availableFilters = new Map(
      available_filters.map((filter) => [filter.id, new FilterModel(filter)])
    )
    this._filters = filters
      ? new Map(filters.map((filter) => [filter.id, new FilterModel(filter)]))
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
    return {
      available: sortByKey(
        [this.sort, ...this.availableSorts],
        'name'
      )?.reverse(),
      current: this.sort,
    }
  }

  queryParams() {
    const filterEntries = this.filters
      ? Array.from(this.filters, ([key, value]) => [key, value])
      : []
    return {
      sort: this.sortOptions.current.id,
      q: this.query,
      limit: this._paging?.limit,
      ...Object.fromEntries(filterEntries),
    }
  }

  filtersOptions() {
    return {
      available: this.availableFilters,
      current: this.filters,
    }
  }
}
