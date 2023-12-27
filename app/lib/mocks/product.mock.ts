import { faker } from '@faker-js/faker'
import { shippingMock } from '@/lib/mocks/shipping.mock'
import { installmentsMock } from '@/lib/mocks/installments.mock'
import { addressMock } from '@/lib/mocks/address.mock'
import { attributeMock } from '@/lib/mocks/attribute.mock'
import { Product } from '@/lib/models/classes/product.model'
import { Installments } from '@/lib/models/classes/installments.model'
import { Address } from '@/lib/models/classes/address.model'
import { Price } from '@/lib/models/classes/price.model'
import { priceMock } from '@/lib/mocks/price.mock'

export const productModelMock = (): Product =>
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
      attributeMock('ITEM_CONDITION')
    ),
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
