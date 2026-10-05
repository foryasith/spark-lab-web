import { ArrowRight, ImageIcon, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPriceLkr } from '../../utils/formatPrice'
import './ProductCard.css'

function ProductCard({ product }) {
  const {
    name,
    slug,
    main_category: category,
    price_lkr: price,
    in_stock: inStock,
    featured,
    image_url: imageUrl,
    brand,
  } = product

  return (
    <article className="product-card">
      <div className="product-card-media">
        {featured && <span className="product-featured-badge">Featured</span>}
        {imageUrl ? (
          <img loading="lazy" src={imageUrl} alt={name} />
        ) : (
          <div className="product-image-placeholder" role="img" aria-label={`${name} image coming soon`}>
            <ImageIcon aria-hidden="true" size={38} strokeWidth={1.4} />
            <span>Product image coming soon</span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{category}</span>
          <span>{brand}</span>
        </div>
        <h3 className="product-card-title">
          <Link to={`/product/${slug}`}>{name}</Link>
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
          <Link className="btn btn-outline product-card-button" to={`/product/${slug}`}>
            View Product
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <button
            className="btn btn-secondary product-card-button"
            type="button"
            disabled={!inStock}
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
