import { FilterType, FilterValueType } from '@/lib/models/types/filters.type'

export class FilterValueModel {
  id: string
  name: string
  results?: number
  constructor({ id, name, results }: FilterValueType) {
    this.id = id
    this.name = name
    this.results = results
  }
}

export class FilterModel {
  id: string
  name: string
  type: string
  values: Map<string, FilterValueModel>
  constructor({ id, name, type, values }: FilterType) {
    this.id = id
    this.name = name
    this.type = type
    this.values = new Map(
      values.map((value) => [value.id, new FilterValueModel(value)])
    )
  }
}
