import { formatCurrency } from '@/lib/utils/currency.utils'
import { ProductState } from '@/store/features/search/search.types'

export const getInstallmentText = (product: ProductState) => {
  const {
    installments: { quantity, amount },
    price: { currency },
  } = product

  return `En ${quantity} cuotas de ${formatCurrency(amount, currency)}`
}
