import { FILTERS_TYPE } from '@/lib/constants/filters.constants'
import {
  FilterModel,
  FilterValueModel,
} from '@/lib/models/classes/filters.model'
import { FilterType, FilterValueType } from '@/lib/models/types/filters.type'
import { faker } from '@faker-js/faker'

const filterValuesMock = (): FilterValueType => ({
  id: faker.database.mongodbObjectId(),
  name: faker.word.words({ count: 1 }),
  results: faker.number.int(),
})

const filterMock = (): FilterType => ({
  id: faker.database.mongodbObjectId(),
  name: faker.word.words({ count: 1 }),
  values: Array.from({ length: 3 }, () => filterValuesMock()),
  type: faker.helpers.arrayElement(Object.values(FILTERS_TYPE)),
})

export const filtersMock = (): FilterType[] =>
  Array.from({ length: 3 }, () => filterMock())

export const filterValueModelMock = (): FilterValueModel =>
  new FilterValueModel(filterValuesMock(), filterModelMock())

export const filterModelMock = (): FilterModel => new FilterModel(filterMock())

export const filtersModelMock = (): Map<string, FilterModel> =>
  new Map(filtersMock().map((item) => [item.id, new FilterModel(item)]))
