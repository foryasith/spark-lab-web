import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import ProductGrid from '../components/product/ProductGrid'
import ProductSearch from '../components/shop/ProductSearch'
import ShopFilters from '../components/shop/ShopFilters'
import ShopSort from '../components/shop/ShopSort'
import useCatalog from '../hooks/useCatalog'
import useSeo from '../hooks/useSeo'
import { filterProducts, getProductCategories } from '../utils/productFilters'
import { filterProductsBySearch } from '../utils/productSearch'
import { sortProducts } from '../utils/productSort'
import './Shop.css'

function Shop() {
  useSeo({
    title: 'Shop Components & Kits | Spark Lab',
    description:
      'Browse development boards, sensors, modules, motors, robotics parts and prototyping supplies at Spark Lab Sri Lanka.',
  })
  const { products, isLoading, error, warning, reload } = useCatalog()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [sortOption, setSortOption] = useState('featured')
  const categoryOptions = getProductCategories(products)
  const searchedProducts = filterProductsBySearch(products, searchTerm)
  const filteredProducts = filterProducts(
    searchedProducts,
    selectedCategory,
    availability,
  )
  const displayedProducts = sortProducts(filteredProducts, sortOption)
  const searchIsActive = searchTerm.trim().length > 0
  const filtersAreActive = selectedCategory !== 'all' || availability !== 'all'

  const clearFilters = () => {
    setSelectedCategory('all')
    setAvailability('all')
  }

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
          {warning && <p className="shop-catalog-warning" role="status">{warning}</p>}
          <div className="shop-toolbar" aria-label="Shop controls preview">
            <ProductSearch
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm('')}
            />

            <ShopFilters
              categories={categoryOptions}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              availability={availability}
              onAvailabilityChange={setAvailability}
              onClear={clearFilters}
              isActive={filtersAreActive}
            />

            <ShopSort value={sortOption} onChange={setSortOption} />

            <p className="shop-result-count" aria-live="polite">
              {searchIsActive || filtersAreActive
                ? `${displayedProducts.length} products found`
                : `${displayedProducts.length} products`}
            </p>
          </div>

          <ProductGrid
            products={displayedProducts}
            isLoading={isLoading}
            error={error}
            onRetry={reload}
            emptyTitle={
              searchIsActive || filtersAreActive ? 'No components found' : undefined
            }
            emptyMessage={
              filtersAreActive
                ? 'Try adjusting your category or availability filters.'
                : searchIsActive
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
