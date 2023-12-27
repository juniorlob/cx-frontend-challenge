import { faker } from '@faker-js/faker'
import { shippingMock } from '@/lib/mocks/shipping.mock'
import { installmentsMock } from '@/lib/mocks/installments.mock'
import { addressMock } from '@/lib/mocks/address.mock'
import { attributeMock } from '@/lib/mocks/attribute.mock'
import { Product } from '@/lib/models/classes/product.model'
import { Installments } from '@/lib/models/classes/installments.model'
import { Address } from '@/lib/models/classes/address.model'

export const productModelMock = (): Product =>
  new Product({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    condition: faker.helpers.arrayElement(['new', 'used']),
    thumbnail: faker.image.url(),
    price: faker.number.int({ min: 10, max: 1000 }),
    shipping: shippingMock(),
    installments: new Installments(installmentsMock()),
    currency_id: faker.finance.currencyCode(),
    attributes: Array.from({ length: 5 }, () => attributeMock()),
    address: new Address(addressMock()),
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
