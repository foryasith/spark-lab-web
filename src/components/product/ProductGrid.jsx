import { PackageOpen } from 'lucide-react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

function ProductGrid({
  products,
  emptyTitle = 'No products available yet.',
  emptyMessage = 'New components are being added to Spark Lab.',
  emptyAction,
}) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <PackageOpen aria-hidden="true" size={36} strokeWidth={1.5} />
        <h2>{emptyTitle}</h2>
        <p>{emptyMessage}</p>
        {emptyAction}
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
