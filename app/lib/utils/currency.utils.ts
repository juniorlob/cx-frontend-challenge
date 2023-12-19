export function formatCurrency(amount: number, currencyCode: string): string {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  })
  return formatter.format(amount)
}
