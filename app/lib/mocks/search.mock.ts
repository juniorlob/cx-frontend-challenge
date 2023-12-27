import { faker } from '@faker-js/faker'
import { productListModelMock } from '@/lib/mocks/product.mock'
import { Search } from '@/lib/models/classes/search.model'

export const searchMock = (): Search => {
  return {
    site_id: 'MLA',
    query: faker.lorem.words(),
    paging: {
      total: productListModelMock.size,
      primary_results: productListModelMock.size,
      offset: 0,
      limit: productListModelMock.size,
    },
    results: productListModelMock,
  }
}
