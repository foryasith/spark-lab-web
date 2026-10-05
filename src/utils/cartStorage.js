export const CART_STORAGE_KEY = 'spark-lab-cart'

function normalizeStoredItem(item) {
  if (!item?.product?.product_id || !item.product.active) return null

  const requestedQuantity = Math.max(1, Math.floor(Number(item.quantity) || 1))
  const availableStock = Number(item.product.stock_qty)
  const quantity = Number.isFinite(availableStock)
    ? Math.min(requestedQuantity, Math.max(0, Math.floor(availableStock)))
    : requestedQuantity

  if (quantity === 0) return null

  return { product: item.product, quantity }
}

export function loadCartItems(storage = globalThis.localStorage) {
  if (!storage) return []

  try {
    const storedCart = storage.getItem(CART_STORAGE_KEY)
    if (!storedCart) return []

    const parsedCart = JSON.parse(storedCart)
    if (!Array.isArray(parsedCart)) return []

    return parsedCart.map(normalizeStoredItem).filter(Boolean)
  } catch {
    return []
  }
}

export function saveCartItems(cartItems, storage = globalThis.localStorage) {
  if (!storage) return false

  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    return true
  } catch {
    return false
  }
}
