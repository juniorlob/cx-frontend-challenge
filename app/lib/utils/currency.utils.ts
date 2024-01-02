export function formatCurrency(
  amount: number | string,
  currencyCode: string
): string {
  const formatter = new Intl.NumberFormat(
    process.env.NEXT_PUBLIC_CURRENCY_LOCALE,
    {
      style: 'currency',
      currency: currencyCode || 'ARS',
      minimumFractionDigits: 0,
    }
  )
  return formatter.format(Number(amount))
}
