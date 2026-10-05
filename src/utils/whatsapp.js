const SPARK_LAB_WHATSAPP_NUMBER = '94761652728'

const whatsappPriceFormatter = new Intl.NumberFormat('en-LK', {
  maximumFractionDigits: 0,
})

function formatWhatsAppPrice(price) {
  if (price === null || price === undefined || price === '') return 'Please confirm'

  const numericPrice = Number(price)
  return Number.isFinite(numericPrice)
    ? `Rs. ${whatsappPriceFormatter.format(numericPrice)}`
    : 'Please confirm'
}

export function createWhatsAppProductMessage(product) {
  const productName = String(product?.name ?? '').trim() || 'Product inquiry'
  const sku = String(product?.sku ?? '').trim()
  const messageLines = [
    'Hello Spark Lab,',
    '',
    'I would like to order this product:',
    '',
    `Product: ${productName}`,
  ]

  if (sku) messageLines.push(`SKU: ${sku}`)

  messageLines.push(
    `Price: ${formatWhatsAppPrice(product?.price_lkr)}`,
    '',
    'Please confirm availability and delivery details.',
    '',
    'Thank you.',
  )

  return messageLines.join('\n')
}

export function createWhatsAppProductUrl(product) {
  const message = createWhatsAppProductMessage(product)
  return `https://wa.me/${SPARK_LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
