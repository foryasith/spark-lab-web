import { PackageOpen } from 'lucide-react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <PackageOpen aria-hidden="true" size={36} strokeWidth={1.5} />
        <h2>No products available yet.</h2>
        <p>New components are being added to Spark Lab.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
