import { ShippingType } from '@/store/features/search/search.types'
import { faker } from '@faker-js/faker'

export const shippingMock = (
  customProperties: Partial<ShippingType> = {}
): ShippingType => ({
  free_shipping: faker.datatype.boolean(),
  ...customProperties,
})
