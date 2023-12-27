import { ProductType } from '@/lib/models/types/product.type'
import { Address } from '@/lib/models/classes/address.model'
import { Installments } from '@/lib/models/classes/installments.model'
import { Price } from '@/lib/models/classes/price.model'

export class Product {
  id: string
  title: string
  price: Price
  installments: Installments
  address: Address
  picture: string
  condition?: string
  free_shipping: boolean
  constructor({
    id,
    title,
    thumbnail,
    price,
    shipping,
    installments,
    currency_id,
    attributes,
    address,
  }: ProductType) {
    this.id = id
    this.title = title
    this.price = new Price({
      amount: price,
      currency: currency_id,
      decimals: 2,
    })
    this.installments = installments && new Installments(installments)
    // FIXME: Check when the address is available on the product list response
    this.address = new Address({
      state_name: address?.state_name,
      city_name: address?.city_name,
    })
    this.picture = thumbnail
    this.condition = attributes?.find(
      (attribute) => attribute.id === 'ITEM_CONDITION'
    )?.value_name
    this.free_shipping = shipping.free_shipping
  }
}
