import { useMemo, useState } from 'react'
import CartContext from './cartContext'

function getAllowedQuantity(product, quantity) {
  const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1))
  const availableStock = Number(product.stock_qty)

  if (!Number.isFinite(availableStock)) return requestedQuantity
  if (availableStock <= 0) return 0

  return Math.min(requestedQuantity, Math.floor(availableStock))
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, quantity = 1) => {
    if (!product?.product_id || !product.active || !product.in_stock) return

    const quantityToAdd = getAllowedQuantity(product, quantity)
    if (quantityToAdd === 0) return

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.product_id === product.product_id,
      )

      if (!existingItem) {
        return [...currentItems, { product, quantity: quantityToAdd }]
      }

      return currentItems.map((item) =>
        item.product.product_id === product.product_id
          ? {
              ...item,
              quantity: getAllowedQuantity(product, item.quantity + quantityToAdd),
            }
          : item,
      )
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.product_id !== productId),
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.product_id === productId
          ? { ...item, quantity: getAllowedQuantity(item.product, quantity) }
          : item,
      ),
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const price = Number(item.product.price_lkr)
        return total + (Number.isFinite(price) ? price * item.quantity : 0)
      }, 0),
    [cartItems],
  )

  const cartValue = {
    cartItems,
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
