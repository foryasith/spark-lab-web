import { MessageCircle, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import EmptyState from '../components/common/EmptyState'
import useCart from '../hooks/useCart'
import useSeo from '../hooks/useSeo'
import analytics from '../utils/analytics'
import { formatPriceLkr } from '../utils/formatPrice'
import { createWhatsAppCartUrl } from '../utils/whatsapp'
import './Cart.css'

function Cart() {
  useSeo({
    title: 'Shopping Cart | Spark Lab',
    description:
      'Review your selected components and proceed with direct WhatsApp ordering from Spark Lab Sri Lanka.',
  })
  const { cartItems, cartCount, cartSubtotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="cart-empty page-view tech-background section">
        <div className="container">
          <EmptyState
            Icon={ShoppingBag}
            headingLevel="h1"
            title="Your cart is empty."
            message="Browse Spark Lab components and add what you need for your next build."
            action={
              <Link className="btn btn-primary" to="/shop">
                Continue Shopping
              </Link>
            }
          />
        </div>
      </section>
    )
  }

  const whatsappCartUrl = createWhatsAppCartUrl(cartItems)

  return (
    <div className="cart-page tech-grid">
      <section className="cart-header section">
        <div className="container cart-header-content">
          <div>
            <p>Ready for Your Next Build</p>
            <h1>Shopping Cart</h1>
            <span>{cartCount} components selected</span>
          </div>
          <button className="cart-clear-button" type="button" onClick={clearCart}>
            <Trash2 aria-hidden="true" size={17} />
            Clear Cart
          </button>
        </div>
      </section>

      <section className="cart-content section" aria-label="Shopping cart items">
        <div className="container cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.product.product_id} item={item} />
            ))}
          </div>

          <aside className="cart-summary" aria-labelledby="cart-summary-title">
            <h2 id="cart-summary-title">Cart Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatPriceLkr(cartSubtotal)}</strong>
            </div>
            <p>Delivery charges will be confirmed before order completion.</p>
            <a
              className="btn btn-primary cart-checkout-button"
              href={whatsappCartUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackWhatsAppCartOrder(cartCount, cartSubtotal)}
            >
              <MessageCircle aria-hidden="true" size={18} />
              Proceed via WhatsApp
            </a>
            <Link className="cart-continue-link" to="/shop">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Cart
