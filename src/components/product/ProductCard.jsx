import { useState } from 'react'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import { formatPriceLkr } from '../../utils/formatPrice'
import {
  getPrimaryProductImage,
  getProductImageAlt,
  PRODUCT_PLACEHOLDER,
} from '../../utils/productImages'
import './ProductCard.css'

function ProductCard({ product = {} }) {
  const { addToCart } = useCart()
  const {
    name,
    slug,
    main_category: category,
    price_lkr: price,
    in_stock: inStock,
    featured,
    brand,
  } = product

  const primaryImage = getPrimaryProductImage(product)
  const imageAlt = getProductImageAlt(product, name || 'Unnamed component')
  const [imgSrc, setImgSrc] = useState(primaryImage)

  const productName = String(name ?? '').trim() || 'Unnamed component'
  const productCategory = String(category ?? '').trim() || 'Components'
  const productBrand = String(brand ?? '').trim()
  const productSlug = String(slug ?? '').trim()
  const productPath = productSlug ? `/product/${productSlug}` : '/shop'

  const handleImageError = () => {
    if (imgSrc !== PRODUCT_PLACEHOLDER) {
      setImgSrc(PRODUCT_PLACEHOLDER)
    }
  }

  return (
    <article className="product-card">
      <div className="product-card-media">
        {featured && <span className="product-featured-badge">Featured</span>}
        <img
          loading="lazy"
          src={imgSrc}
          alt={imageAlt}
          onError={handleImageError}
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{productCategory}</span>
          {productBrand && <span>{productBrand}</span>}
        </div>
        <h3 className="product-card-title">
          <Link to={productPath}>{productName}</Link>
        </h3>

        <div className="product-card-purchase-info">
          <p className="product-card-price">{formatPriceLkr(price)}</p>
          <span
            className={`product-stock-badge ${inStock ? 'is-in-stock' : 'is-out-of-stock'}`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="product-card-actions">
          <Link className="btn btn-outline product-card-button" to={productPath}>
            View Product
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <button
            className="btn btn-secondary product-card-button"
            type="button"
            disabled={!inStock}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart aria-hidden="true" size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
