import { useState } from 'react'
import { CircuitBoard } from 'lucide-react'

function ProductImage({ imageUrl, name }) {
  const [hasImageError, setHasImageError] = useState(false)
  const showImage = imageUrl && !hasImageError

  if (showImage) {
    return (
      <img
        className="product-detail-image"
        src={imageUrl}
        alt={name}
        onError={() => setHasImageError(true)}
      />
    )
  }

  return (
    <div className="product-detail-placeholder" role="img" aria-label={`${name} image coming soon`}>
      <span className="product-detail-placeholder-icon">
        <CircuitBoard aria-hidden="true" size={52} strokeWidth={1.3} />
      </span>
      <strong>SPARK LAB</strong>
      <span>Product Image</span>
      <small>Coming Soon</small>
    </div>
  )
}

export default ProductImage
