import { faker } from '@faker-js/faker'
import { shippingMock } from '@/lib/mocks/shipping.mock'
import { installmentsMock } from '@/lib/mocks/installments.mock'
import { addressMock, addressModelMock } from '@/lib/mocks/address.mock'
import { attributeMock } from '@/lib/mocks/attribute.mock'
import { Product } from '@/lib/models/classes/product.model'
import { Installments } from '@/lib/models/classes/installments.model'
import { Address } from '@/lib/models/classes/address.model'
import { ProductType } from '@/lib/models/types/product.type'

export const productMock = (): ProductType => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  condition: faker.helpers.arrayElement(['new', 'used', undefined]),
  thumbnail: faker.image.url(),
  price: faker.finance.amount(5, 10, 2, '', true),
  shipping: shippingMock(),
  installments: installmentsMock(),
  currency_id: faker.finance.currencyCode(),
  attributes: Array.from({ length: 5 }, () =>
    attributeMock({ id: 'ITEM_CONDITION' })
  ),
  address: addressMock(),
})

export const productsMock = (): ProductType[] => {
  return Array.from(
    { length: Number(process.env.NEXT_PUBLIC_MELI_QUERY_LIMIT) || 10 },
    () => productMock()
  )
}

export const productModelMock = (
  customProperties: Partial<ProductType> = {}
): Product =>
  new Product({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    condition: faker.helpers.arrayElement(['new', 'used', undefined]),
    thumbnail: faker.image.url(),
    price: faker.finance.amount(5, 10, 2, '', true),
    shipping: shippingMock(),
    installments: new Installments(installmentsMock()),
    currency_id: faker.finance.currencyCode(),
    attributes: Array.from({ length: 5 }, () =>
      attributeMock({ id: 'ITEM_CONDITION' })
    ),
    address: addressMock(),
    ...customProperties,
  })

export const productListModelMock = new Map(
  Array.from(
    { length: Number(process.env.NEXT_PUBLIC_MELI_QUERY_LIMIT) || 10 },
    () => {
      const product = productModelMock()
      return [product.id, productModelMock()]
    }
  )
)
