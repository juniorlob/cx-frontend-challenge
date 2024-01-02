import { Search } from '@/lib/models/classes/search.model'
import {
  FilterType,
  FilterTypes,
  FilterValueType,
} from '@/lib/models/types/filters.type'

export class FilterValueModel {
  private _id: string
  private _name: string
  private _results?: number
  private _filter: FilterModel

  constructor(filterValueData: FilterValueType, filter: FilterModel) {
    const { id, name, results } = filterValueData
    this._id = id
    this._name = name
    this._results = results
    this._filter = filter
  }
  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get results() {
    return this._results
  }

  get filter() {
    return this._filter
  }

  get isActive() {
    return (
      this.filter.search.filters?.get(this.filter.id)?.values.get(this._id)
        ?.id === this._id
    )
  }
}

export class FilterModel {
  private _id: string
  private _name: string
  private _type: FilterTypes
  private _values: Map<string, FilterValueModel>
  private _search: Search

  constructor(filterData: FilterType, search: Search) {
    const { id, name, type, values } = filterData
    this._id = id
    this._name = name
    this._type = type
    this._values = new Map(
      values.map((value) => [value.id, new FilterValueModel(value, this)])
    )
    this._search = search
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get type() {
    return this._type
  }

  get values() {
    return this._values
  }

  get search() {
    return this._search
  }
}
