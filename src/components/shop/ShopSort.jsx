import './ShopSort.css'

function ShopSort({ value, onChange }) {
  return (
    <label className="shop-sort">
      <span>Sort by</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="featured">Featured</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="name-a-z">Name: A to Z</option>
        <option value="name-z-a">Name: Z to A</option>
      </select>
    </label>
  )
}

export default ShopSort
