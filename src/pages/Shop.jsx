import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import ProductGrid from '../components/product/ProductGrid'
import ProductSearch from '../components/shop/ProductSearch'
import { products } from '../data/products'
import { filterProductsBySearch } from '../utils/productSearch'
import './Shop.css'

const activeProducts = products.filter((product) => product.active)

const categoryQuickLinks = [
  'All',
  'Development Boards',
  'Sensors',
  'Modules',
  'Robotics',
  'Components',
  'Tools',
  'Kits',
]

function Shop() {
  const [searchTerm, setSearchTerm] = useState('')
  const displayedProducts = filterProductsBySearch(activeProducts, searchTerm)
  const searchIsActive = searchTerm.trim().length > 0

  return (
    <div className="shop-page tech-grid">
      <section className="shop-header section">
        <div className="container">
          <PageHeader
            eyebrow="Spark Lab Store"
            title="Shop Components"
            description="Explore electronics, IoT, robotics and maker components for your next project."
          />
        </div>
      </section>

      <section className="shop-catalog section" aria-label="Product catalog">
        <div className="container">
          <div className="shop-toolbar" aria-label="Shop controls preview">
            <ProductSearch
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm('')}
            />

            <label className="shop-select-preview">
              <span>Category</span>
              <select defaultValue="all" aria-describedby="shop-controls-note">
                <option value="all">All Categories</option>
              </select>
            </label>

            <label className="shop-select-preview">
              <span>Sort</span>
              <select defaultValue="featured" aria-describedby="shop-controls-note">
                <option value="featured">Featured</option>
              </select>
            </label>

            <p className="shop-result-count" aria-live="polite">
              {searchIsActive
                ? `${displayedProducts.length} products found`
                : `${displayedProducts.length} products`}
            </p>
            <p id="shop-controls-note" className="sr-only">
              Category and sorting controls are being prepared for a later update.
            </p>
          </div>

          <nav className="shop-category-strip" aria-label="Product category quick links">
            <ul>
              {categoryQuickLinks.map((category, index) => (
                <li key={category} aria-current={index === 0 ? 'page' : undefined}>
                  {category}
                </li>
              ))}
            </ul>
          </nav>

          <ProductGrid
            products={displayedProducts}
            emptyTitle={searchIsActive ? 'No components found' : undefined}
            emptyMessage={
              searchIsActive
                ? 'Try another product name, category or keyword.'
                : undefined
            }
            emptyAction={
              searchIsActive ? (
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              ) : null
            }
          />
        </div>
      </section>
    </div>
  )
}

export default Shop
