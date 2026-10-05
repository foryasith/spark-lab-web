export const WHATSAPP_NUMBER = '94761652728'

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

function getSafeQuantity(quantity) {
  const numericQuantity = Math.floor(Number(quantity))
  return Number.isFinite(numericQuantity) && numericQuantity > 0 ? numericQuantity : 1
}

export function createWhatsAppProductMessage(product, quantity = 1) {
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
    `Quantity: ${getSafeQuantity(quantity)}`,
    '',
    'Please confirm availability and delivery details.',
    '',
    'Thank you.',
  )

  return messageLines.join('\n')
}

export function createWhatsAppProductUrl(product, quantity = 1) {
  const message = createWhatsAppProductMessage(product, quantity)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function createWhatsAppCartMessage(cartItems) {
  const messageLines = [
    'Hello Spark Lab,',
    '',
    'I would like to order these products:',
    '',
  ]

  cartItems.forEach(({ product, quantity }, index) => {
    const productName = String(product?.name ?? '').trim() || 'Product inquiry'
    const sku = String(product?.sku ?? '').trim()

    messageLines.push(`${index + 1}. ${productName}`)
    if (sku) messageLines.push(`SKU: ${sku}`)
    messageLines.push(
      `Price: ${formatWhatsAppPrice(product?.price_lkr)}`,
      `Quantity: ${getSafeQuantity(quantity)}`,
      '',
    )
  })

  messageLines.push(
    'Please confirm availability and delivery details.',
    '',
    'Thank you.',
  )

  return messageLines.join('\n')
}

export function createWhatsAppCartUrl(cartItems) {
  const message = createWhatsAppCartMessage(cartItems)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
