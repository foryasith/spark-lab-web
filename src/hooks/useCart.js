import { useContext } from 'react'
import CartContext from '../context/cartContext'

function useCart() {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error('useCart must be used within CartProvider')
  }

  return cart
}

export default useCart
