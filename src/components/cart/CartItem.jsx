import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import { formatPriceLkr } from '../../utils/formatPrice'
import {
  getPrimaryProductImage,
  getProductImageAlt,
  PRODUCT_PLACEHOLDER,
} from '../../utils/productImages'
import QuantitySelector from './QuantitySelector'
import './CartItem.css'

function CartItem({ item }) {
  const { product, quantity } = item
  const { removeFromCart, updateQuantity } = useCart()

  const primaryImage = getPrimaryProductImage(product)
  const imageAlt = getProductImageAlt(product, product?.name || 'Product')
  const [imgSrc, setImgSrc] = useState(primaryImage)

  const availableStock = Number(product.stock_qty)
  const hasStockLimit = Number.isFinite(availableStock)
  const productName = String(product.name ?? '').trim() || 'Unnamed component'
  const productCategory = String(product.main_category ?? '').trim() || 'Components'
  const productSlug = String(product.slug ?? '').trim()
  const productPath = productSlug ? `/product/${productSlug}` : '/shop'
  const sku = String(product.sku ?? '').trim()

  const handleImageError = () => {
    if (imgSrc !== PRODUCT_PLACEHOLDER) {
      setImgSrc(PRODUCT_PLACEHOLDER)
    }
  }

  return (
    <article className="cart-item">
      <Link className="cart-item-media" to={productPath}>
        <img
          loading="lazy"
          src={imgSrc}
          alt={imageAlt}
          onError={handleImageError}
        />
      </Link>

      <div className="cart-item-details">
        <p>{productCategory}</p>
        <h2>
          <Link to={productPath}>{productName}</Link>
        </h2>
        {sku && <span>SKU: {sku}</span>}
      </div>

      <p className="cart-item-unit-price">{formatPriceLkr(product.price_lkr)}</p>

      <QuantitySelector
        quantity={quantity}
        productName={productName}
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
        aria-label={`Remove ${productName} from cart`}
      >
        <Trash2 aria-hidden="true" size={18} />
      </button>
    </article>
  )
}

export default CartItem
