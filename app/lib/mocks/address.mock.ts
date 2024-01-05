import { AddressType } from '@/store/features/search/search.types'
import { faker } from '@faker-js/faker'

export const addressMock = (): AddressType => ({
  state_name: faker.location.state(),
  city_name: faker.location.city(),
})
