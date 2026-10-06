import { products as localProducts } from '../data/products.js'
import {
  fetchGoogleSheetRows,
  getGoogleSheetsCatalogConfig,
} from './googleSheets.js'

const LOCAL_FALLBACK_WARNING =
  'The live catalog is not configured. Showing the local development catalog.'

function cleanString(value) {
  return String(value ?? '').trim()
}

export function normalizeCatalogBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1

  const normalizedValue = cleanString(value).toLowerCase()
  if (['true', '1', 'yes', 'y'].includes(normalizedValue)) return true
  if (['false', '0', 'no', 'n'].includes(normalizedValue)) return false
  return fallback
}

export function normalizeCatalogNumber(value, fallback = null) {
  if (value === null || value === undefined || cleanString(value) === '') return fallback

  const numericValue = Number(String(value).replaceAll(',', '').trim())
  return Number.isFinite(numericValue) ? numericValue : fallback
}

function createSlug(value) {
  return cleanString(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeKeySpecs(value) {
  if (Array.isArray(value)) return value.map(cleanString).filter(Boolean)

  const rawValue = cleanString(value)
  if (!rawValue) return []

  if (rawValue.startsWith('[')) {
    try {
      const parsedValue = JSON.parse(rawValue)
      if (Array.isArray(parsedValue)) return parsedValue.map(cleanString).filter(Boolean)
    } catch {
      // Continue with delimiter parsing for a human-edited sheet value.
    }
  }

  return rawValue.split(/\r?\n|\s*[|;]\s*/).map(cleanString).filter(Boolean)
}

function cleanImageUrl(value) {
  const cleaned = cleanString(value)
  if (!cleaned || cleaned.toLowerCase() === 'undefined' || cleaned.toLowerCase() === 'null') {
    return null
  }
  return cleaned
}

function cleanImageAlt(value) {
  const cleaned = cleanString(value)
  if (!cleaned || cleaned.toLowerCase() === 'undefined' || cleaned.toLowerCase() === 'null') {
    return null
  }
  return cleaned
}

export function normalizeCatalogProduct(row = {}) {
  const name = cleanString(row.name)
  const productId = cleanString(row.product_id)
  const stockQuantity = Math.max(0, normalizeCatalogNumber(row.stock_qty, 0))
  const explicitStock = cleanString(row.in_stock)

  return {
    product_id: productId,
    name,
    slug: createSlug(row.slug || name || productId),
    main_category: cleanString(row.main_category),
    subcategory: cleanString(row.subcategory),
    price_lkr: normalizeCatalogNumber(row.price_lkr),
    stock_qty: stockQuantity,
    in_stock: explicitStock
      ? normalizeCatalogBoolean(row.in_stock, stockQuantity > 0)
      : stockQuantity > 0,
    featured: normalizeCatalogBoolean(row.featured),
    active: normalizeCatalogBoolean(row.active),
    image_url: cleanImageUrl(row.image_url),
    image_url_2: cleanImageUrl(row.image_url_2),
    image_url_3: cleanImageUrl(row.image_url_3),
    image_url_4: cleanImageUrl(row.image_url_4),
    image_alt: cleanImageAlt(row.image_alt),
    short_description: cleanString(row.short_description),
    key_specs: normalizeKeySpecs(row.key_specs),
    brand: cleanString(row.brand),
    sku: cleanString(row.sku),
  }
}

export function normalizeCatalogRows(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map(normalizeCatalogProduct)
    .filter((product) => product.active && product.name && product.slug)
}

export async function loadCatalog({
  signal,
  fallbackToLocal = Boolean(import.meta.env?.DEV),
} = {}) {
  const fallbackProducts = normalizeCatalogRows(localProducts)
  const config = getGoogleSheetsCatalogConfig()

  if (!config.isConfigured) {
    if (fallbackToLocal) {
      console.info(`[Spark Lab catalog] ${LOCAL_FALLBACK_WARNING}`)
      return {
        products: fallbackProducts,
        source: 'local',
        warning: LOCAL_FALLBACK_WARNING,
      }
    }
    throw new Error('Production catalog configuration is missing.')
  }

  try {
    const sheetRows = await fetchGoogleSheetRows({ url: config.url, signal })
    return {
      products: normalizeCatalogRows(sheetRows),
      source: 'google-sheets',
      warning: '',
    }
  } catch (error) {
    if (error?.name === 'AbortError') throw error
    if (!fallbackToLocal) throw error

    const warning = 'The live catalog could not be loaded. Showing the local development catalog.'
    console.warn(`[Spark Lab catalog] ${warning}`, error)
    return { products: fallbackProducts, source: 'local', warning }
  }
}
