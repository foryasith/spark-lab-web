import { useState } from 'react'
import {
  Check,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import QuantitySelector from '../components/cart/QuantitySelector'
import ErrorState from '../components/common/ErrorState'
import ProductGrid from '../components/product/ProductGrid'
import ProductImage from '../components/product/ProductImage'
import { products } from '../data/products'
import useCart from '../hooks/useCart'
import { formatPriceLkr } from '../utils/formatPrice'
import { normalizeProductSpecs } from '../utils/productSpecs'
import { createWhatsAppProductUrl } from '../utils/whatsapp'
import './ProductDetails.css'

function ProductDetails() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [quantityState, setQuantityState] = useState({ productId: '', quantity: 1 })
  const product = products.find((item) => item.active && item.slug === slug)

  if (!product) {
    return (
      <section className="product-not-found page-view tech-background section">
        <div className="container">
          <ErrorState
            headingLevel="h1"
            title="Product not found"
            message="The component you're looking for could not be found."
            action={
              <Link className="btn btn-primary" to="/shop">
                Back to Shop
              </Link>
            }
          />
        </div>
      </section>
    )
  }

  const availableStock = Number(product.stock_qty)
  const hasStockLimit = Number.isFinite(availableStock)
  const productName = String(product.name ?? '').trim() || 'Unnamed component'
  const category = String(product.main_category ?? '').trim() || 'Components'
  const subcategory = String(product.subcategory ?? '').trim()
  const brand = String(product.brand ?? '').trim()
  const sku = String(product.sku ?? '').trim()
  const description = String(product.short_description ?? '').trim()
  const quantity =
    quantityState.productId === product.product_id ? quantityState.quantity : 1

  const setProductQuantity = (nextQuantity) => {
    const maximumQuantity = hasStockLimit ? Math.max(1, availableStock) : nextQuantity
    setQuantityState({
      productId: product.product_id,
      quantity: Math.min(Math.max(1, nextQuantity), maximumQuantity),
    })
  }

  const specifications = normalizeProductSpecs(product.key_specs)
  const whatsappOrderUrl = createWhatsAppProductUrl(product, quantity)
  const relatedProducts = product.main_category
    ? products
        .filter(
          (item) =>
            item.active &&
            item.product_id !== product.product_id &&
            item.main_category === product.main_category,
        )
        .slice(0, 4)
    : []

  return (
    <div className="product-details-page">
      <section className="product-overview section tech-background">
        <div className="container">
          <nav className="product-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
                <ChevronRight aria-hidden="true" size={14} />
              </li>
              <li>
                <Link to="/shop">Shop</Link>
                <ChevronRight aria-hidden="true" size={14} />
              </li>
              <li>
                <Link to="/categories">{category}</Link>
                <ChevronRight aria-hidden="true" size={14} />
              </li>
              <li>
                <span aria-current="page">{productName}</span>
              </li>
            </ol>
          </nav>

          <div className="product-detail-layout">
            <div className="product-detail-media">
              <ProductImage
                key={product.product_id}
                imageUrl={product.image_url}
                name={productName}
              />
            </div>

            <article className="product-detail-info">
              <p className="product-detail-category">
                {category}{subcategory ? ` / ${subcategory}` : ''}
              </p>
              <h1 className="product-detail-title">{productName}</h1>
              {(brand || sku) && (
                <div className="product-detail-meta">
                  {brand && <span>Brand: <strong>{brand}</strong></span>}
                  {sku && <span>SKU: <strong>{sku}</strong></span>}
                </div>
              )}

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

              {description && <p className="product-detail-description">{description}</p>}

              <div className="product-detail-quantity">
                <span>Quantity</span>
                <QuantitySelector
                  quantity={quantity}
                  productName={productName}
                  onDecrease={() => setProductQuantity(quantity - 1)}
                  onIncrease={() => setProductQuantity(quantity + 1)}
                  decreaseDisabled={quantity <= 1 || !product.in_stock}
                  increaseDisabled={
                    !product.in_stock || (hasStockLimit && quantity >= availableStock)
                  }
                />
                {hasStockLimit && product.in_stock && (
                  <small>{availableStock} available</small>
                )}
              </div>

              <div className="product-detail-actions">
                <button
                  className="btn btn-secondary"
                  type="button"
                  disabled={!product.in_stock}
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingCart aria-hidden="true" size={18} />
                  Add to Cart
                </button>
                <a
                  className="btn product-whatsapp-button"
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden="true" size={18} />
                  {product.in_stock ? 'Order on WhatsApp' : 'Ask About Availability'}
                </a>
              </div>

              <ul className="product-trust-list" aria-label="Spark Lab service benefits">
                <li>
                  <Truck aria-hidden="true" size={17} />
                  Islandwide Delivery
                </li>
                <li>
                  <GraduationCap aria-hidden="true" size={17} />
                  Student Friendly Support
                </li>
                <li>
                  <ShieldCheck aria-hidden="true" size={17} />
                  Quality Components
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="product-specifications section" aria-label="Product information">
        <div className="container product-detail-sections">
          <div>
            <h2>Product Information</h2>
            <dl className="product-information-list">
              <div>
                <dt>Category</dt>
                <dd>{category}</dd>
              </div>
              {subcategory && (
                <div>
                  <dt>Subcategory</dt>
                  <dd>{subcategory}</dd>
                </div>
              )}
              {brand && (
                <div>
                  <dt>Brand</dt>
                  <dd>{brand}</dd>
                </div>
              )}
              {sku && (
                <div>
                  <dt>SKU</dt>
                  <dd>{sku}</dd>
                </div>
              )}
              <div>
                <dt>Availability</dt>
                <dd>{product.in_stock ? 'In Stock' : 'Out of Stock'}</dd>
              </div>
            </dl>
          </div>

          {specifications.length > 0 && (
            <div>
              <h2 id="specifications-title">Product Specifications</h2>
              <div className="product-spec-list" aria-labelledby="specifications-title">
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
          )}
        </div>
      </section>

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
