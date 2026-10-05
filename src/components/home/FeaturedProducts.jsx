import { ArrowRight, PackageOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import EmptyState from '../common/EmptyState'
import ProductCard from '../product/ProductCard'
import './FeaturedProducts.css'

const featuredProducts = products
  .filter((product) => product.featured && product.active)
  .slice(0, 8)

function FeaturedProducts() {
  return (
    <section className="featured-products section" aria-labelledby="featured-products-title">
      <div className="container">
        <div className="featured-products-heading">
          <header className="section-header">
            <p className="featured-products-label">Popular Picks</p>
            <h2 id="featured-products-title" className="section-title">
              Featured Components
            </h2>
            <p className="section-subtitle">
              Popular parts for student projects, IoT builds and maker ideas.
            </p>
          </header>

          <Link className="btn btn-outline featured-products-link" to="/shop">
            View All Products
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="featured-products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            Icon={PackageOpen}
            headingLevel="h3"
            title="Featured components are coming soon."
            message="Visit the shop to explore the latest Spark Lab products."
          />
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts
