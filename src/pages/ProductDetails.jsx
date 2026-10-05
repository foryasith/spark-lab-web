import {
  Check,
  ChevronRight,
  MessageCircle,
  PackageX,
  ShoppingCart,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductImage from '../components/product/ProductImage'
import { products } from '../data/products'
import { formatPriceLkr } from '../utils/formatPrice'
import { normalizeProductSpecs } from '../utils/productSpecs'
import './ProductDetails.css'

function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((item) => item.active && item.slug === slug)

  if (!product) {
    return (
      <section className="product-not-found page-view tech-background section">
        <div className="container">
          <div className="product-not-found-card">
            <PackageX aria-hidden="true" size={44} strokeWidth={1.4} />
            <h1>Product not found</h1>
            <p>The component you are looking for may be unavailable or has moved.</p>
            <Link className="btn btn-primary" to="/shop">
              Return to Shop
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const specifications = normalizeProductSpecs(product.key_specs)
  const relatedProducts = products
    .filter(
      (item) =>
        item.active &&
        item.product_id !== product.product_id &&
        item.main_category === product.main_category,
    )
    .slice(0, 4)

  return (
    <div className="product-details-page">
      <section className="product-overview section tech-background">
        <div className="container">
          <nav className="product-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/shop">Shop</Link>
                <ChevronRight aria-hidden="true" size={14} />
              </li>
              <li>
                <Link to="/categories">{product.main_category}</Link>
                <ChevronRight aria-hidden="true" size={14} />
              </li>
              <li>
                <span aria-current="page">{product.name}</span>
              </li>
            </ol>
          </nav>

          <div className="product-detail-layout">
            <div className="product-detail-media">
              <ProductImage
                key={product.product_id}
                imageUrl={product.image_url}
                name={product.name}
              />
            </div>

            <article className="product-detail-info">
              <p className="product-detail-category">
                {product.main_category} / {product.subcategory}
              </p>
              <h1 className="product-detail-title">{product.name}</h1>
              <div className="product-detail-meta">
                <span>
                  Brand: <strong>{product.brand}</strong>
                </span>
                <span>
                  SKU: <strong>{product.sku}</strong>
                </span>
              </div>

              <div className="product-detail-price-row">
                <p className="product-detail-price">
                  {formatPriceLkr(product.price_lkr)}
                </p>
                <span
                  className={`product-stock-badge ${product.in_stock ? 'is-in-stock' : 'is-out-of-stock'}`}
                >
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <p className="product-detail-description">{product.short_description}</p>

              <div className="product-detail-actions">
                <button
                  className="btn btn-secondary"
                  type="button"
                  disabled={!product.in_stock}
                >
                  <ShoppingCart aria-hidden="true" size={18} />
                  Add to Cart
                </button>
                <button className="btn product-whatsapp-button" type="button">
                  <MessageCircle aria-hidden="true" size={18} />
                  Order on WhatsApp
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {specifications.length > 0 && (
        <section className="product-specifications section" aria-labelledby="specifications-title">
          <div className="container">
            <h2 id="specifications-title">Technical Details</h2>
            <div className="product-spec-list">
              {specifications.map((specification, index) => (
                <div
                  className="product-spec-item"
                  key={`${specification.label}-${specification.value}-${index}`}
                >
                  <Check aria-hidden="true" size={17} />
                  <span>
                    {specification.label && <strong>{specification.label}</strong>}
                    <small>{specification.value}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="related-products section" aria-labelledby="related-products-title">
          <div className="container">
            <header className="section-header">
              <h2 id="related-products-title">Related Components</h2>
              <p className="section-subtitle">
                You may also need these parts for your next build.
              </p>
            </header>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetails
