import { AttributeType } from '@/lib/models/types/attribute.type'
import { faker } from '@faker-js/faker'

export const attributeMock = (id: string): AttributeType => ({
  id: id || faker.string.uuid(),
  name: faker.commerce.productMaterial(),
  value_name: faker.commerce.productAdjective(),
})
