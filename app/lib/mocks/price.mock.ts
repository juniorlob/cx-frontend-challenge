import { PriceType } from '@/lib/models/types/price.type'
import { faker } from '@faker-js/faker'

export const priceMock = (): PriceType => ({
  amount: faker.finance.amount(5, 10, 2, '', true),
  currency: faker.finance.currencyCode(),
  decimals: 2,
})
