import { ProductType } from '@/lib/models/types/product.type'
import { Address } from '@/lib/models/classes/address.model'
import { Installments } from '@/lib/models/classes/installments.model'
import { Price } from '@/lib/models/classes/price.model'

export class Product {
  private _id: string
  private _title: string
  private _price: Price
  private _installments: Installments
  private _address: Address
  private _picture: string
  private _condition?: string
  private _free_shipping: boolean
  constructor(productData: ProductType) {
    const {
      id,
      title,
      thumbnail,
      price,
      shipping,
      installments,
      currency_id,
      attributes,
      address,
    } = productData

    this._id = id
    this._title = title
    this._price = new Price({
      amount: price,
      currency: currency_id,
      decimals: 2,
    })
    this._installments = installments && new Installments(installments)
    // FIXME: Check when the address is available on the product list response
    this._address = new Address({
      state_name: address?.state_name,
      city_name: address?.city_name,
    })
    this._picture = thumbnail
    this._condition = attributes?.find(
      (attribute) => attribute.id === 'ITEM_CONDITION'
    )?.value_name
    this._free_shipping = shipping.free_shipping
  }

  get id() {
    return this._id
  }

  get title() {
    return this._title
  }

  get price() {
    return this._price
  }

  get installments() {
    return this._installments
  }

  get address() {
    return this._address
  }

  get picture() {
    return this._picture
  }

  get condition() {
    return this._condition
  }

  get freeShipping() {
    return this._free_shipping
  }
}
