import { useState } from 'react'
import {
  getProductGalleryImages,
  getProductImageAlt,
  PRODUCT_PLACEHOLDER,
} from '../../utils/productImages'
import './ProductImage.css'

function ProductImage({ product, imageUrl, name }) {
  const productObj =
    product && typeof product === 'object'
      ? product
      : { image_url: imageUrl, name }

  const rawGallery = getProductGalleryImages(productObj)
  const imageAlt = getProductImageAlt(productObj, name || 'Product')
  const productName = String(productObj.name || name || 'Product').trim()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [failedUrls, setFailedUrls] = useState(() => new Set())

  const validGallery = rawGallery.filter((url) => !failedUrls.has(url))
  const displayGallery = validGallery.length > 0 ? validGallery : [PRODUCT_PLACEHOLDER]

  const safeIndex = selectedIndex < displayGallery.length ? selectedIndex : 0
  const activeImage = displayGallery[safeIndex] || PRODUCT_PLACEHOLDER

  const handleImageError = (failedUrl) => {
    if (failedUrl && failedUrl !== PRODUCT_PLACEHOLDER) {
      setFailedUrls((prev) => {
        const next = new Set(prev)
        next.add(failedUrl)
        return next
      })
    }
  }

  const showThumbnails = displayGallery.length > 1

  return (
    <div className="product-gallery">
      <div className="product-gallery-primary">
        <img
          key={activeImage}
          className="product-detail-image"
          src={activeImage}
          alt={imageAlt}
          onError={() => handleImageError(activeImage)}
        />
      </div>

      {showThumbnails && (
        <div
          className="product-gallery-thumbnails"
          role="region"
          aria-label="Product image gallery"
        >
          {displayGallery.map((imgUrl, index) => {
            const isSelected = index === safeIndex
            return (
              <button
                key={`${imgUrl}-${index}`}
                type="button"
                className={`product-gallery-thumbnail ${isSelected ? 'is-active' : ''}`}
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${productName} image ${index + 1} of ${displayGallery.length}`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} thumbnail ${index + 1}`}
                  onError={() => handleImageError(imgUrl)}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductImage
