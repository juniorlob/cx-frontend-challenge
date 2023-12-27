import { Product } from '@/lib/models/classes/product.model'
import { formatCurrency } from '@/lib/utils/currency.utils'

export const getInstallmentText = (product: Product) => {
  const {
    installments: { quantity, amount },
    price: { currency },
  } = product

  return `En ${quantity} cuotas de ${formatCurrency(amount, currency)}`
}
