import { RotateCcw } from 'lucide-react'
import './ShopFilters.css'

function ShopFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  availability,
  onAvailabilityChange,
  onClear,
  isActive,
}) {
  return (
    <div className="shop-filters" aria-label="Product filters">
      <label className="shop-filter-control">
        <span>Category</span>
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="shop-filter-control">
        <span>Availability</span>
        <select
          value={availability}
          onChange={(event) => onAvailabilityChange(event.target.value)}
        >
          <option value="all">All Products</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </label>

      {isActive && (
        <button className="shop-clear-filters" type="button" onClick={onClear}>
          <RotateCcw aria-hidden="true" size={15} />
          Clear Filters
        </button>
      )}
    </div>
  )
}

export default ShopFilters
