function compareNames(firstProduct, secondProduct) {
  return String(firstProduct.name ?? '').localeCompare(String(secondProduct.name ?? ''), 'en', {
    sensitivity: 'base',
  })
}

function comparePrices(firstProduct, secondProduct, direction) {
  const firstPrice = Number(firstProduct.price_lkr)
  const secondPrice = Number(secondProduct.price_lkr)
  const firstHasPrice = Number.isFinite(firstPrice)
  const secondHasPrice = Number.isFinite(secondPrice)

  if (!firstHasPrice && !secondHasPrice) return compareNames(firstProduct, secondProduct)
  if (!firstHasPrice) return 1
  if (!secondHasPrice) return -1

  return direction === 'ascending' ? firstPrice - secondPrice : secondPrice - firstPrice
}

export function sortProducts(products, sortOption) {
  return [...products].sort((firstProduct, secondProduct) => {
    switch (sortOption) {
      case 'price-low-high':
        return comparePrices(firstProduct, secondProduct, 'ascending')
      case 'price-high-low':
        return comparePrices(firstProduct, secondProduct, 'descending')
      case 'name-a-z':
        return compareNames(firstProduct, secondProduct)
      case 'name-z-a':
        return compareNames(secondProduct, firstProduct)
      case 'featured':
      default:
        return (
          Number(Boolean(secondProduct.featured)) -
            Number(Boolean(firstProduct.featured)) || compareNames(firstProduct, secondProduct)
        )
    }
  })
}
