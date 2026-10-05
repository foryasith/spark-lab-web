import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'
import LoadingState from '../common/LoadingState'
import ProductCard from './ProductCard'
import './ProductGrid.css'

function ProductGrid({
  products = [],
  isLoading = false,
  error = null,
  onRetry,
  emptyTitle = 'No products available yet.',
  emptyMessage = 'New components are being added to Spark Lab.',
  emptyAction,
}) {
  if (isLoading) {
    return <LoadingState variant="products" count={8} />
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />
  }

  if (products.length === 0) {
    return (
      <EmptyState title={emptyTitle} message={emptyMessage} action={emptyAction} />
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
