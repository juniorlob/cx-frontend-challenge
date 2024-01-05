import { productsMock } from '@/lib/mocks/product.mock'
import { sortMock, sortsMock } from '@/lib/mocks/sort.mock'
import { filtersMock } from '@/lib/mocks/filters.mock'
import { faker } from '@faker-js/faker'
import { SearchState } from '@/store/features/search/search.types'

export const searchMock = (): SearchState => {
  return {
    products: productsMock(),
    available_sorts: sortsMock(),
    sort: sortMock(),
    query: faker.word.words({ count: 1 }),
    filters: filtersMock(),
    available_filters: filtersMock(),
    paging: { limit: faker.number.int() },
  }
}
