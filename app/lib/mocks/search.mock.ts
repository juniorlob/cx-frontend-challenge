import {
  productListModelMock,
  productMock,
  productsMock,
} from '@/lib/mocks/product.mock'
import { Search } from '@/lib/models/classes/search.model'
import { sortMock, sortsMock } from '@/lib/mocks/sort.mock'
import { SearchType } from '@/lib/models/types/search.type'
import { filtersMock } from '@/lib/mocks/filters.mock'
import { faker } from '@faker-js/faker'

export const searchMock = (): SearchType => {
  return {
    results: productsMock(),
    available_sorts: sortsMock(),
    sort: sortMock(),
    query: faker.word.words({ count: 1 }),
    filters: filtersMock(),
    available_filters: filtersMock(),
    paging: { limit: faker.number.int() },
  }
}

export const searchModelMock = (): Search => new Search(searchMock())
