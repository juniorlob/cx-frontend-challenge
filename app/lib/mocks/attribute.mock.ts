import { AttributeType } from '@/store/features/search/search.types'
import { faker } from '@faker-js/faker'

export const attributeMock = (
  customProperties: Partial<AttributeType>
): AttributeType => ({
  id: faker.string.uuid(),
  name: faker.commerce.productMaterial(),
  value_name: faker.commerce.productAdjective(),
  ...customProperties,
})
