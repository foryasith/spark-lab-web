import { useState } from 'react'
import { CircuitBoard, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import { formatPriceLkr } from '../../utils/formatPrice'
import QuantitySelector from './QuantitySelector'
import './CartItem.css'

function CartItem({ item }) {
  const { product, quantity } = item
  const { removeFromCart, updateQuantity } = useCart()
  const [hasImageError, setHasImageError] = useState(false)
  const availableStock = Number(product.stock_qty)
  const hasStockLimit = Number.isFinite(availableStock)
  const showImage = product.image_url && !hasImageError

  return (
    <article className="cart-item">
      <Link className="cart-item-media" to={`/product/${product.slug}`}>
        {showImage ? (
          <img
            src={product.image_url}
            alt={product.name}
            onError={() => setHasImageError(true)}
          />
        ) : (
          <CircuitBoard aria-hidden="true" size={30} strokeWidth={1.4} />
        )}
      </Link>

      <div className="cart-item-details">
        <p>{product.main_category}</p>
        <h2>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h2>
        <span>SKU: {product.sku || 'Not listed'}</span>
      </div>

      <p className="cart-item-unit-price">{formatPriceLkr(product.price_lkr)}</p>

      <QuantitySelector
        quantity={quantity}
        productName={product.name}
        onDecrease={() => updateQuantity(product.product_id, quantity - 1)}
        onIncrease={() => updateQuantity(product.product_id, quantity + 1)}
        decreaseDisabled={quantity <= 1}
        increaseDisabled={hasStockLimit && quantity >= availableStock}
      />

      <p className="cart-item-subtotal">
        {formatPriceLkr(Number(product.price_lkr) * quantity)}
      </p>

      <button
        className="cart-item-remove"
        type="button"
        onClick={() => removeFromCart(product.product_id)}
        aria-label={`Remove ${product.name} from cart`}
      >
        <Trash2 aria-hidden="true" size={18} />
      </button>
    </article>
  )
}

export default CartItem
