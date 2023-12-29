import { PriceType } from '@/lib/models/types/price.type'

export class Price {
  private _amount: number | string
  private _currency: string
  private _decimals: number

  constructor(priceData: PriceType) {
    const { amount, currency, decimals } = priceData
    this._amount = amount
    this._currency = currency
    this._decimals = decimals
  }

  get amount() {
    return this._amount
  }

  get currency() {
    return this._currency
  }

  get decimals() {
    return this._decimals
  }
}
