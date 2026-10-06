/**
 * Spark Lab Storefront Analytics Foundation.
 * Safe event tracking helpers for key business actions.
 * Safely fails without disrupting UI if no analytics provider is configured.
 */

export function trackEvent(eventName, payload = {}) {
  try {
    if (typeof window === 'undefined') return

    const sanitizedPayload = { ...payload }

    // Strip sensitive user fields
    delete sanitizedPayload.message
    delete sanitizedPayload.description
    delete sanitizedPayload.email
    delete sanitizedPayload.phone
    delete sanitizedPayload.whatsappNumber

    const eventDetail = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...sanitizedPayload,
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitizedPayload)
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventDetail)
    }

    if (typeof window.sparkLabAnalytics === 'function') {
      window.sparkLabAnalytics(eventName, sanitizedPayload)
    }

    if (import.meta.env?.DEV) {
      console.debug(`[Analytics Event: ${eventName}]`, sanitizedPayload)
    }
  } catch (error) {
    console.warn('[Analytics Error]', error)
  }
}

export const analytics = {
  trackViewProduct: (product) => {
    if (!product) return
    trackEvent('view_product', {
      product_id: product.product_id || '',
      product_name: product.name || '',
      category: product.main_category || '',
      price: product.price_lkr ?? 0,
    })
  },

  trackSearchProducts: (query, resultCount = 0) => {
    const trimmed = String(query ?? '').trim()
    if (!trimmed) return
    trackEvent('search_products', {
      search_term: trimmed,
      result_count: resultCount,
    })
  },

  trackAddToCart: (product, quantity = 1) => {
    if (!product) return
    trackEvent('add_to_cart', {
      product_id: product.product_id || '',
      product_name: product.name || '',
      category: product.main_category || '',
      price: product.price_lkr ?? 0,
      quantity,
    })
  },

  trackRemoveFromCart: (productId) => {
    if (!productId) return
    trackEvent('remove_from_cart', {
      product_id: String(productId),
    })
  },

  trackWhatsAppProductOrder: (product, quantity = 1) => {
    if (!product) return
    trackEvent('whatsapp_product_order', {
      product_id: product.product_id || '',
      product_name: product.name || '',
      quantity,
      price: product.price_lkr ?? 0,
    })
  },

  trackWhatsAppCartOrder: (itemCount = 0, totalValue = 0) => {
    trackEvent('whatsapp_cart_order', {
      item_count: itemCount,
      total_value: totalValue,
    })
  },

  trackProjectAiAnalysis: (mode = 'custom') => {
    trackEvent('project_ai_analysis', {
      analysis_mode: mode,
    })
  },

  trackProjectRequest: (requestType = 'general', componentCount = 0) => {
    trackEvent('project_request', {
      request_type: requestType,
      component_count: componentCount,
    })
  },

  trackContactWhatsApp: (source = 'contact_page') => {
    trackEvent('contact_whatsapp', {
      source,
    })
  },

  trackProjectBuilderOpened: (mode = 'explore') => {
    trackEvent('project_builder_opened', {
      initial_mode: mode,
    })
  },
}

export default analytics
