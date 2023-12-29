import { faker } from '@faker-js/faker'
import { Address } from '../models/classes/address.model'
import { AddressType } from '@/lib/models/types/address.type'

export const addressMock = (): AddressType => ({
  state_name: faker.location.state(),
  city_name: faker.location.city(),
})
export const addressModelMock = (): Address => {
  return new Address(addressMock())
}
