import productPlaceholder from '../assets/ui/product-placeholder.svg'

export const PRODUCT_PLACEHOLDER = productPlaceholder

/**
 * Validates if a value is a valid non-empty HTTP/HTTPS URL or relative image URL.
 */
export function isValidImageUrl(url) {
  if (typeof url !== 'string') return false
  const trimmed = url.trim()
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return false
  return (
    /^https?:\/\/[^\s]+$/i.test(trimmed) ||
    /^\/[^\s]+$/i.test(trimmed) ||
    /^data:image\/[^\s]+$/i.test(trimmed)
  )
}

/**
 * Collects gallery image URLs from a product object.
 * Filters out invalid/empty URLs and duplicate entries.
 * Returns an array with at least one image URL (or [PRODUCT_PLACEHOLDER]).
 */
export function getProductGalleryImages(product) {
  if (!product || typeof product !== 'object') {
    return [PRODUCT_PLACEHOLDER]
  }

  const rawCandidates = [
    product.image_url,
    product.image_url_2,
    product.image_url_3,
    product.image_url_4,
  ]

  const validUrls = []
  const seen = new Set()

  for (const candidate of rawCandidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim()
      if (isValidImageUrl(trimmed) && !seen.has(trimmed)) {
        seen.add(trimmed)
        validUrls.push(trimmed)
      }
    }
  }

  return validUrls.length > 0 ? validUrls : [PRODUCT_PLACEHOLDER]
}

/**
 * Gets the primary product image URL for a product.
 * Returns the main valid image URL or the Spark Lab branded fallback placeholder.
 */
export function getPrimaryProductImage(product) {
  const gallery = getProductGalleryImages(product)
  return gallery[0] || PRODUCT_PLACEHOLDER
}

/**
 * Returns an accessible image alt description for a product.
 * Uses product.image_alt if present, or defaults to `${name} product image`.
 */
export function getProductImageAlt(product, defaultName = 'Product') {
  if (product?.image_alt && typeof product.image_alt === 'string' && product.image_alt.trim()) {
    return product.image_alt.trim()
  }
  const name = String(product?.name ?? defaultName).trim() || defaultName
  return `${name} product image`
}
