import { faker } from '@faker-js/faker'
import { Address } from '../models/classes/address.model'

export const addressMock = (): Address => {
  return new Address({
    state_name: faker.location.state(),
    city_name: faker.location.city(),
  })
}
