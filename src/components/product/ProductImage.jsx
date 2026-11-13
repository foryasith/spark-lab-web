import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Search, X } from 'lucide-react'
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
  const [isZoomed, setIsZoomed] = useState(false)

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

  const closeZoom = () => setIsZoomed(false)

  return (
    <div className="product-gallery">
      <button
        className="product-gallery-primary"
        type="button"
        onClick={() => setIsZoomed(true)}
        aria-label={`View full image of ${productName}`}
      >
        <img
          key={activeImage}
          className="product-detail-image"
          src={activeImage}
          alt={imageAlt}
          onError={() => handleImageError(activeImage)}
        />
        <span className="product-gallery-zoom" aria-hidden="true">
          <Search size={18} />
          Zoom image
        </span>
      </button>

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

      {isZoomed && createPortal(
        <div
          className="product-gallery-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeZoom()
          }}
        >
          <section
            className="product-gallery-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} full image`}
          >
            <button
              className="product-gallery-lightbox-close"
              type="button"
              onClick={closeZoom}
              aria-label="Close full image"
            >
              <X aria-hidden="true" size={22} />
            </button>
            <img src={activeImage} alt={imageAlt} onError={() => handleImageError(activeImage)} />
          </section>
        </div>,
        document.body,
      )}
    </div>
  )
}

export default ProductImage
