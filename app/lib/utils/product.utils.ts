import { Product } from '../models/classes/product.model'
import { formatCurrency } from './currency.utils'

export const getInstallmentText = (product: Product) => {
  const {
    installments: { quantity, amount },
    price: { currency },
  } = product

  return `En ${quantity} cuotas de ${formatCurrency(amount, currency)}`
}
