import { AddressType } from '@/lib/models/types/address.type'

export class Address {
  state_name: string
  city_name: string

  constructor({ state_name, city_name }: AddressType) {
    this.state_name = state_name
    this.city_name = city_name
  }
}
