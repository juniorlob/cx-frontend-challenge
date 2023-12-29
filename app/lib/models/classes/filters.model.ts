import { FilterType, FilterValueType } from '@/lib/models/types/filters.type'

export class FilterValueModel {
  private _id: string
  private _name: string
  private _results?: number
  constructor(filterValueData: FilterValueType) {
    const { id, name, results } = filterValueData
    this._id = id
    this._name = name
    this._results = results
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
}

export class FilterModel {
  private _id: string
  private _name: string
  private _type: string
  private _values: Map<string, FilterValueModel>
  constructor(filterData: FilterType) {
    const { id, name, type, values } = filterData
    this._id = id
    this._name = name
    this._type = type
    this._values = new Map(
      values.map((value) => [value.id, new FilterValueModel(value)])
    )
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
}
