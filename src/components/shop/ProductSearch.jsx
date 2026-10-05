import { Search, X } from 'lucide-react'
import './ProductSearch.css'

function ProductSearch({ value, onChange, onClear }) {
  return (
    <div className="product-search">
      <label className="sr-only" htmlFor="product-search-input">
        Search products
      </label>
      <Search aria-hidden="true" size={19} />
      <input
        id="product-search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search components, sensors, boards..."
      />
      {value && (
        <button type="button" onClick={onClear} aria-label="Clear product search">
          <X aria-hidden="true" size={17} />
        </button>
      )}
    </div>
  )
}

export default ProductSearch
