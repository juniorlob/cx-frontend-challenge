import { ShippingType } from '@/lib/models/types/shipping.type'
import { faker } from '@faker-js/faker'

export const shippingMock = (
  customProperties: Partial<ShippingType> = {}
): ShippingType => ({
  free_shipping: faker.datatype.boolean(),
  ...customProperties,
})
