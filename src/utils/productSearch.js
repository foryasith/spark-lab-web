const searchableProductFields = [
  'name',
  'brand',
  'sku',
  'main_category',
  'subcategory',
  'short_description',
]

export function filterProductsBySearch(products, searchTerm) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  if (!normalizedSearch) return products

  return products.filter((product) =>
    searchableProductFields.some((field) =>
      String(product[field] ?? '')
        .toLowerCase()
        .includes(normalizedSearch),
    ),
  )
}
