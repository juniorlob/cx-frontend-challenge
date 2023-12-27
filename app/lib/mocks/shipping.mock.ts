import { ShippingType } from '@/lib/models/types/shipping.type'
import { faker } from '@faker-js/faker'

export const shippingMock = (): ShippingType => ({
  free_shipping: faker.datatype.boolean(),
})
