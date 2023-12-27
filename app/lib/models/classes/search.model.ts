import { SearchType } from '@/lib/models/types/search.type'
import { Product } from '@/lib/models/classes/product.model'

export class Search {
  site_id: string
  query: string
  paging: {
    total: number
    primary_results: number
    offset: number
    limit: number
  }
  results: Map<string, Product>

  constructor({ site_id, query, paging, results }: SearchType) {
    this.site_id = site_id
    this.query = query
    this.paging = {
      total: paging.total,
      primary_results: paging.primary_results,
      offset: paging.offset,
      limit: paging.limit,
    }
    this.results = new Map(
      results.map((result) => [result.id, new Product(result)])
    )
  }
}
