export function getProductCategories(products) {
  return [...new Set(products.map((product) => product.main_category).filter(Boolean))].sort(
    (firstCategory, secondCategory) => firstCategory.localeCompare(secondCategory),
  )
}

export function filterProducts(products, selectedCategory, availability) {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.main_category === selectedCategory

    const matchesAvailability =
      availability === 'all' ||
      (availability === 'in-stock' && product.in_stock) ||
      (availability === 'out-of-stock' && !product.in_stock)

    return matchesCategory && matchesAvailability
  })
}
