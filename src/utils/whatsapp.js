import business from '../config/business.js'

export const WHATSAPP_NUMBER = business.whatsappNumber

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

export function createWhatsAppUrl(message) {
  const safeMessage = String(message ?? '').trim()
  const query = safeMessage ? `?text=${encodeURIComponent(safeMessage)}` : ''
  return `https://wa.me/${WHATSAPP_NUMBER}${query}`
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
  return createWhatsAppUrl(message)
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
  return createWhatsAppUrl(message)
}

function getCleanSupportValue(value) {
  return String(value ?? '').trim()
}

export function createProjectSupportMessage(formData) {
  const fullName = getCleanSupportValue(formData?.fullName) || 'Spark Lab customer'
  const projectType = getCleanSupportValue(formData?.projectType) || 'Not specified'
  const projectDescription =
    getCleanSupportValue(formData?.projectDescription) || 'Not provided'
  const optionalDetails = [
    ['Email', formData?.email],
    ['WhatsApp Number', formData?.whatsappNumber],
    ['Project Title', formData?.projectTitle],
    ['Current Stage', formData?.currentStage],
    ['Components Already Available', formData?.componentsAvailable],
    ['Help Needed', formData?.helpNeeded],
  ]
  const messageLines = [
    'Hello Spark Lab,',
    '',
    'I would like guidance with my project.',
    '',
    `Name: ${fullName}`,
    `Project Type: ${projectType}`,
  ]

  optionalDetails.forEach(([label, value]) => {
    const cleanValue = getCleanSupportValue(value)
    if (cleanValue) messageLines.push(`${label}: ${cleanValue}`)
  })

  messageLines.push(
    '',
    'Project Description:',
    projectDescription,
    '',
    'Please let me know how Spark Lab can support this project.',
    '',
    'Thank you.',
  )

  return messageLines.join('\n')
}

export function createProjectSupportUrl(formData) {
  const message = createProjectSupportMessage(formData)
  return createWhatsAppUrl(message)
}

export function createContactMessage(formData) {
  const name = getCleanSupportValue(formData?.name) || 'Spark Lab customer'
  const subject = getCleanSupportValue(formData?.subject) || 'General inquiry'
  const message = getCleanSupportValue(formData?.message) || 'I would like more information.'
  const email = getCleanSupportValue(formData?.email)
  const whatsappNumber = getCleanSupportValue(formData?.whatsappNumber)
  const messageLines = [
    'Hello Spark Lab,',
    '',
    `Name: ${name}`,
    `Subject: ${subject}`,
  ]

  if (email) messageLines.push(`Email: ${email}`)
  if (whatsappNumber) messageLines.push(`WhatsApp Number: ${whatsappNumber}`)

  messageLines.push('', 'Message:', message, '', 'Thank you.')

  return messageLines.join('\n')
}

export function createContactUrl(formData) {
  return createWhatsAppUrl(createContactMessage(formData))
}

export function createAiProjectRequestMessage({
  projectData,
  advisorResult,
  selectedComponents = [],
  requestType = 'full',
  clarificationAnswers = {},
}) {
  const projectName = getCleanSupportValue(projectData?.projectName) || 'Custom project idea'
  const description = getCleanSupportValue(projectData?.description) || 'Not provided'
  const expectedFunctionality =
    getCleanSupportValue(projectData?.expectedFunctionality) || 'Not provided'
  const experienceLevel = getCleanSupportValue(projectData?.experienceLevel) || 'Not Sure'
  const budgetRange = getCleanSupportValue(projectData?.budgetRange) || 'Not Sure'
  const platform =
    getCleanSupportValue(advisorResult?.recommended_platform) || 'Needs confirmation'
  const requestedComponents = selectedComponents.filter(
    (component) => requestType !== 'missing' || !component.product,
  )
  const missingComponents = requestedComponents.filter((component) => !component.product)
  const messageLines = [
    'Hello Spark Lab,',
    '',
    'I would like assistance with a project.',
    '',
    'PROJECT:',
    projectName,
    '',
    'DESCRIPTION:',
    description,
    '',
    'EXPECTED FUNCTION:',
    expectedFunctionality,
    '',
    `EXPERIENCE LEVEL: ${experienceLevel}`,
    `BUDGET RANGE: ${budgetRange}`,
    `AI SUGGESTED PLATFORM: ${platform}`,
    '',
    requestType === 'missing' ? 'MISSING COMPONENTS REQUESTED:' : 'COMPONENTS REQUESTED:',
    '',
  ]

  if (requestedComponents.length === 0) {
    messageLines.push('No components selected.')
  } else {
    requestedComponents.forEach((component, index) => {
      const name = component.product?.name || component.recommendation?.name || 'Component'
      const quantity = Math.max(1, Math.floor(Number(component.recommendation?.quantity) || 1))
      const sku = getCleanSupportValue(component.product?.sku)
      messageLines.push(`${index + 1}. ${name} - Qty ${quantity}${sku ? ` - SKU ${sku}` : ''}`)
    })
  }

  if (missingComponents.length > 0 && requestType !== 'missing') {
    messageLines.push('', 'COMPONENTS NOT CURRENTLY LISTED:')
    missingComponents.forEach((component) => {
      messageLines.push(component.recommendation?.name || 'Component to confirm')
    })
  }

  const clarificationEntries = Object.entries(clarificationAnswers).filter(
    ([, answer]) => getCleanSupportValue(answer),
  )
  if (clarificationEntries.length > 0) {
    messageLines.push('', 'CLARIFICATION ANSWERS:')
    clarificationEntries.forEach(([question, answer]) => {
      messageLines.push(`${question}: ${getCleanSupportValue(answer)}`)
    })
  }

  messageLines.push(
    '',
    'Please check component availability and advise me on suitable compatible parts.',
    '',
    'Thank you.',
  )

  return messageLines.join('\n')
}

export function createAiProjectRequestUrl(requestData) {
  return createWhatsAppUrl(createAiProjectRequestMessage(requestData))
}
