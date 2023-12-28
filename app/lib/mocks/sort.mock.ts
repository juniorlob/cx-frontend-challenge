import { SortType } from '@/lib/models/types/sort.type'
import { faker } from '@faker-js/faker'

export const sortMock = (): SortType => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
})

export const sortsMock = (): SortType[] =>
  Array.from({ length: 3 }, () => sortMock())
