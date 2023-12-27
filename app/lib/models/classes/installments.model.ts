import { InstallmentsType } from '@/lib/models/types/installments.type'

export class Installments {
  quantity: number
  amount: number

  constructor({ quantity, amount }: InstallmentsType) {
    this.quantity = quantity
    this.amount = amount
  }
}
