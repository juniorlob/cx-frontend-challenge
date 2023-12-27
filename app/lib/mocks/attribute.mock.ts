import { faker } from '@faker-js/faker'
import { AttributeType } from '../models/types/attribute.type'

export const attributeMock = (): AttributeType => ({
  id: faker.string.uuid(),
  name: faker.commerce.productMaterial(),
  value_name: faker.commerce.productAdjective(),
})
