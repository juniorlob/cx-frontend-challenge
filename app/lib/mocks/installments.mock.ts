import { Installments } from '@/lib/models/classes/installments.model'
import { faker } from '@faker-js/faker'

export const installmentsMock = (): Installments => {
  return new Installments({
    quantity: faker.number.int({ min: 1, max: 12 }),
    amount: faker.number.int({ min: 100, max: 10000 }),
  })
}
