import { SearchType } from '@/lib/models/types/search.type'
import { Product } from '@/lib/models/classes/product.model'
import { SortType } from '@/lib/models/types/sort.type'

export class Search {
  results: Map<string, Product>
  sort: SortType
  availableSorts: SortType[]
  constructor({ results, sort, available_sorts }: SearchType) {
    this.results = new Map(
      results.map((result) => [result.id, new Product(result)])
    )
    this.sort = sort
    this.availableSorts = available_sorts
  }
}
