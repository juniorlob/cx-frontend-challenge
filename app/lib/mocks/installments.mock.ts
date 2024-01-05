import { InstallmentsType } from '@/store/features/search/search.types'
import { faker } from '@faker-js/faker'

export const installmentsMock = (): InstallmentsType => {
  return {
    quantity: faker.number.int({ min: 1, max: 12 }),
    amount: faker.number.int({ min: 100, max: 10000 }),
  }
}
