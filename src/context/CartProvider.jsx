import { useEffect, useMemo, useState } from 'react'
import useCatalog from '../hooks/useCatalog'
import { loadCartItems, saveCartItems } from '../utils/cartStorage'
import CartContext from './cartContext'

function getAllowedQuantity(product, quantity) {
  const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1))
  const availableStock = Number(product.stock_qty)

  if (!Number.isFinite(availableStock)) return requestedQuantity
  if (availableStock <= 0) return 0

  return Math.min(requestedQuantity, Math.floor(availableStock))
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartItems)
  const { products: catalogProducts, isLoading: isCatalogLoading } = useCatalog()
  const catalogById = useMemo(
    () => new Map(catalogProducts.map((product) => [product.product_id, product])),
    [catalogProducts],
  )
  const catalogBySlug = useMemo(
    () => new Map(catalogProducts.map((product) => [product.slug, product])),
    [catalogProducts],
  )
  const resolvedCartItems = useMemo(() => {
    if (isCatalogLoading) return cartItems

    return cartItems.flatMap((item) => {
      const catalogProduct =
        catalogById.get(item.product.product_id) || catalogBySlug.get(item.product.slug)
      if (!catalogProduct) return []

      const quantity = getAllowedQuantity(catalogProduct, item.quantity)
      return quantity > 0 ? [{ product: catalogProduct, quantity }] : []
    })
  }, [cartItems, catalogById, catalogBySlug, isCatalogLoading])

  useEffect(() => {
    saveCartItems(resolvedCartItems)
  }, [resolvedCartItems])

  const addToCart = (product, quantity = 1) => {
    if (!product?.product_id || !product.active || !product.in_stock) return

    const quantityToAdd = getAllowedQuantity(product, quantity)
    if (quantityToAdd === 0) return

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => {
          const currentProduct =
            catalogById.get(item.product.product_id) || catalogBySlug.get(item.product.slug)
          return currentProduct?.product_id === product.product_id
        },
      )

      if (!existingItem) {
        return [...currentItems, { product, quantity: quantityToAdd }]
      }

      return currentItems.map((item) =>
        (catalogById.get(item.product.product_id) || catalogBySlug.get(item.product.slug))
          ?.product_id === product.product_id
          ? {
              product,
              quantity: getAllowedQuantity(product, item.quantity + quantityToAdd),
            }
          : item,
      )
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => {
        const currentProduct =
          catalogById.get(item.product.product_id) || catalogBySlug.get(item.product.slug)
        return currentProduct?.product_id !== productId
      }),
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const currentProduct =
          catalogById.get(item.product.product_id) || catalogBySlug.get(item.product.slug)
        return currentProduct?.product_id === productId
          ? { product: currentProduct, quantity: getAllowedQuantity(currentProduct, quantity) }
          : item
      }),
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = useMemo(
    () => resolvedCartItems.reduce((total, item) => total + item.quantity, 0),
    [resolvedCartItems],
  )

  const cartSubtotal = useMemo(
    () =>
      resolvedCartItems.reduce((total, item) => {
        const price = Number(item.product.price_lkr)
        return total + (Number.isFinite(price) ? price * item.quantity : 0)
      }, 0),
    [resolvedCartItems],
  )

  const cartValue = {
    cartItems: resolvedCartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
}

export default CartProvider
