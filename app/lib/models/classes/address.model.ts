import { AddressType } from '@/lib/models/types/address.type'

export class Address {
  private _state_name: string
  private _city_name: string

  constructor(addressData: AddressType) {
    const { state_name, city_name } = addressData
    this._state_name = state_name
    this._city_name = city_name
  }
  get stateName() {
    return this._state_name
  }
  get cityName() {
    return this._city_name
  }
}
