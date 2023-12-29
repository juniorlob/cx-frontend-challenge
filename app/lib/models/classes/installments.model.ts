import { InstallmentsType } from '@/lib/models/types/installments.type'

export class Installments {
  private _quantity: number
  private _amount: number

  constructor(installmentsData: InstallmentsType) {
    const { quantity, amount } = installmentsData
    this._quantity = quantity
    this._amount = amount
  }

  get quantity() {
    return this._quantity
  }

  get amount() {
    return this._amount
  }
}
