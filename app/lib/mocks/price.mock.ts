import { PriceState } from '@/store/features/search/search.types'
import { faker } from '@faker-js/faker'

export const priceMock = (): PriceState => ({
  amount: faker.finance.amount(5, 10, 2, '', true),
  currency: faker.finance.currencyCode(),
  decimals: 2,
})
