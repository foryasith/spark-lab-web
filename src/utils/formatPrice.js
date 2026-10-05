const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 0,
})

export function formatPriceLkr(price, fallback = 'Contact for price') {
  if (price === null || price === undefined || price === '') return fallback

  const numericPrice = Number(price)
  return Number.isFinite(numericPrice) ? lkrFormatter.format(numericPrice) : fallback
}
