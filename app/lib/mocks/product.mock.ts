import { faker } from '@faker-js/faker'
import { shippingMock } from '@/lib/mocks/shipping.mock'
import { installmentsMock } from '@/lib/mocks/installments.mock'
import { addressMock } from '@/lib/mocks/address.mock'
import { ProductState } from '@/store/features/search/search.types'
import { priceMock } from '@/lib/mocks/price.mock'

export const productMock = (
  customProperties: Partial<ProductState> = {}
): ProductState => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  condition: faker.helpers.arrayElement(['new', 'used', undefined]),
  picture: faker.image.url(),
  price: priceMock(),
  free_shipping: faker.datatype.boolean(),
  installments: installmentsMock(),
  address: addressMock(),
  ...customProperties,
})

export const productsMock = (): ProductState[] => {
  return Array.from(
    { length: Number(process.env.NEXT_PUBLIC_MELI_QUERY_LIMIT) || 10 },
    () => productMock()
  )
}
