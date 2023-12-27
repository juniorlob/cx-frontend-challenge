import { AddressType } from '@/lib/models/types/address.type'
import { AttributeType } from '@/lib/models/types/attribute.type'
import { InstallmentsType } from '@/lib/models/types/installments.type'
import { ShippingType } from '@/lib/models/types/shipping.type'

export type ProductType = {
  id: string
  title: string
  condition: string | undefined
  thumbnail: string
  price: number | string
  shipping: ShippingType
  installments: InstallmentsType
  currency_id: string
  attributes: AttributeType[]
  address: AddressType
}
