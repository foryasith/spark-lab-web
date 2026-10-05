import './UiState.css'

function LoadingState({
  message = 'Loading components...',
  variant = 'default',
  count = 4,
}) {
  const skeletonCount = Math.max(1, Math.min(8, Math.floor(Number(count) || 4)))

  if (variant === 'products') {
    return (
      <div className="ui-loading-products" role="status" aria-live="polite">
        <span className="sr-only">{message}</span>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div className="product-skeleton" aria-hidden="true" key={index}>
            <div className="skeleton-block product-skeleton-media" />
            <div className="product-skeleton-body">
              <div className="skeleton-block product-skeleton-label" />
              <div className="skeleton-block product-skeleton-title" />
              <div className="skeleton-block product-skeleton-price" />
              <div className="skeleton-block product-skeleton-button" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="ui-state ui-loading-state" role="status" aria-live="polite">
      <span className="loading-indicator" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default LoadingState
