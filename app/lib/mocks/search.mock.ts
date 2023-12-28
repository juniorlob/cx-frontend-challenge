import {
  productListModelMock,
  productMock,
  productsMock,
} from '@/lib/mocks/product.mock'
import { Search } from '@/lib/models/classes/search.model'
import { sortMock, sortsMock } from '@/lib/mocks/sort.mock'
import { SearchType } from '@/lib/models/types/search.type'

export const searchMock = (): SearchType => {
  return {
    results: productsMock(),
    available_sorts: sortsMock(),
    sort: sortMock(),
  }
}

export const searchModelMock = (): Search => new Search(searchMock())
