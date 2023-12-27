import { PriceType } from '@/lib/models/types/price.type'

export class Price {
  amount: number | string
  currency: string
  decimals: number

  constructor({ amount, currency, decimals }: PriceType) {
    this.amount = amount
    this.currency = currency
    this.decimals = decimals
  }
}
