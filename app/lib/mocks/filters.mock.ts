import { FILTERS_TYPE } from '@/lib/constants/filters.constants'
import {
  FilterType,
  FilterValueType,
} from '@/store/features/search/search.types'

import { faker } from '@faker-js/faker'

const filterValuesMock = (): FilterValueType => ({
  id: faker.database.mongodbObjectId(),
  name: faker.word.words({ count: 1 }),
  results: faker.number.int(),
  active: faker.datatype.boolean(),
  filterId: faker.database.mongodbObjectId(),
})

export const filterMock = (): FilterType => ({
  id: faker.database.mongodbObjectId(),
  name: faker.word.words({ count: 1 }),
  values: Array.from({ length: 3 }, () => filterValuesMock()),
  type: faker.helpers.arrayElement(Object.values(FILTERS_TYPE)),
})

export const filtersMock = (): FilterType[] =>
  Array.from({ length: 3 }, () => filterMock())
