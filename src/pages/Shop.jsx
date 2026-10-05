import { Search } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import ProductGrid from '../components/product/ProductGrid'
import { products } from '../data/products'
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
            <label className="shop-search-preview">
              <span className="sr-only">Search products</span>
              <Search aria-hidden="true" size={19} />
              <input
                type="search"
                placeholder="Search products"
                readOnly
                aria-describedby="shop-controls-note"
              />
            </label>

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

            <p className="shop-result-count">{activeProducts.length} products</p>
            <p id="shop-controls-note" className="sr-only">
              Search, category and sorting controls are being prepared for a later update.
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

          <ProductGrid products={activeProducts} />
        </div>
      </section>
    </div>
  )
}

export default Shop
