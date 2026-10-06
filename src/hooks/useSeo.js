import { useEffect } from 'react'

const DEFAULT_TITLE = 'Spark Lab | IoT, Robotics & Electronics Components Sri Lanka'
const DEFAULT_DESCRIPTION =
  'Shop electronics, IoT, robotics and maker components for student projects and innovative builds with Spark Lab Sri Lanka.'
const DEFAULT_IMAGE = '/spark-lab-og-image.png'

export function useSeo({
  title,
  description,
  image,
  type = 'website',
  url,
} = {}) {
  useEffect(() => {
    const pageTitle = title ? `${title}` : DEFAULT_TITLE
    const pageDescription = description || DEFAULT_DESCRIPTION
    const pageImage = image || DEFAULT_IMAGE
    const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

    document.title = pageTitle

    const setMetaTag = (nameOrProperty, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, nameOrProperty)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    setMetaTag('description', pageDescription)
    setMetaTag('og:title', pageTitle, true)
    setMetaTag('og:description', pageDescription, true)
    setMetaTag('og:image', pageImage, true)
    setMetaTag('og:type', type, true)
    if (pageUrl) setMetaTag('og:url', pageUrl, true)
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', pageTitle)
    setMetaTag('twitter:description', pageDescription)
    setMetaTag('twitter:image', pageImage)
  }, [title, description, image, type, url])
}

export default useSeo
