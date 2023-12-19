type ShippingType = {
  free_shipping: boolean
}

type SellerType = {
  id: number
  nickname: string
}

type AttributeType = {
  id: string
  name: string
  value_name: string
}

type InstallmentsType = {
  quantity: number
  amount: number
}

type AddressType = {
  state_name: string
  city_name: string
}

type PriceType = {
  amount: number
  currency: string // Assuming you want to change 'currency' to 'currency_id' to match the constructor parameter in Product class.
  decimals: number
}

type ProductType = {
  id: string
  title: string
  condition: string
  thumbnail: string
  price: number
  shipping: ShippingType
  installments: InstallmentsType
  currency_id: string
}

class Seller {
  id: number
  nickname: string

  constructor({ id, nickname }: SellerType) {
    this.id = id
    this.nickname = nickname
  }
}

class Attribute {
  id: string
  name: string
  value_name: string

  constructor({ id, name, value_name }: AttributeType) {
    this.id = id
    this.name = name
    this.value_name = value_name
  }
}

class Installments {
  quantity: number
  amount: number

  constructor({ quantity, amount }: InstallmentsType) {
    this.quantity = quantity
    this.amount = amount
  }
}

class Address {
  state_name: string
  city_name: string

  constructor({ state_name, city_name }: AddressType) {
    this.state_name = state_name
    this.city_name = city_name
  }
}

export class Price {
  amount: number
  currency: string
  decimals: number

  constructor({ amount, currency, decimals }: PriceType) {
    this.amount = amount
    this.currency = currency
    this.decimals = decimals
  }
}

export class Product {
  id: string
  title: string
  price: Price
  installments: Installments
  address: Address
  picture: string
  condition: string
  free_shipping: boolean
  constructor({
    id,
    title,
    condition,
    thumbnail,
    price,
    shipping,
    installments,
    currency_id,
  }: ProductType) {
    this.id = id
    this.title = title
    this.price = new Price({
      amount: price,
      currency: currency_id,
      decimals: 2,
    })
    this.installments = new Installments(installments)
    this.address = new Address({
      state_name: '',
      city_name: '',
    })
    this.picture = thumbnail
    this.condition = condition
    this.free_shipping = shipping.free_shipping
  }
}

export class SearchResult {
  site_id: string
  country_default_time_zone: string
  query: string
  paging: {
    total: number
    primary_results: number
    offset: number
    limit: number
  }
  results: Map<string, Product>

  constructor({
    site_id,
    country_default_time_zone,
    query,
    paging,
    results,
  }: {
    site_id: string
    country_default_time_zone: string
    query: string
    paging: {
      total: number
      primary_results: number
      offset: number
      limit: number
    }
    results: ProductType[]
  }) {
    this.site_id = site_id
    this.country_default_time_zone = country_default_time_zone
    this.query = query
    this.paging = {
      total: paging.total,
      primary_results: paging.primary_results,
      offset: paging.offset,
      limit: paging.limit,
    }
    this.results = new Map(
      results.map((result) => [result.id, new Product(result)])
    )
  }
}
