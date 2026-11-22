import { formatPriceLkr } from './formatPrice.js'

function safeText(value) {
  return String(value ?? '').trim()
}

function escapeHtml(value) {
  return safeText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function filenamePart(value) {
  return safeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'project-plan'
}

function listLines(title, items) {
  if (!Array.isArray(items) || items.length === 0) return []
  return ['', title, ...items.map((item, index) => `${index + 1}. ${safeText(item?.name || item)}`)]
}

function componentLines(components) {
  if (!Array.isArray(components) || components.length === 0) return ['No selected components yet.']

  return components.map((component, index) => {
    const recommendation = component.recommendation || component
    const product = component.product
    const quantity = Math.max(1, Number(recommendation.quantity) || 1)
    const details = [
      `${index + 1}. ${safeText(recommendation.name)} × ${quantity}`,
      `   ${safeText(recommendation.reason)}`,
    ]

    if (product) {
      details.push(`   Catalog: ${safeText(product.name)} | ${formatPriceLkr(product.price_lkr)} | ${product.in_stock ? 'In stock' : 'Check availability'}`)
    } else {
      details.push('   Catalog: Not currently listed')
    }

    return details.join('\n')
  })
}

export function createProjectPlanText({ projectName, projectData, result, components, catalogSubtotal }) {
  const title = safeText(projectName) || 'Spark Lab Project Plan'
  const lines = [
    'SPARK LAB',
    'Build. Test. Innovate.',
    '',
    title.toUpperCase(),
    '',
    `Project summary: ${safeText(result.project_summary)}`,
    `Difficulty: ${safeText(result.difficulty)}`,
    `Recommended controller: ${safeText(result.recommended_platform)}`,
    `Controller reason: ${safeText(result.recommended_controller_reason)}`,
    '',
    'PROJECT IDEA',
    safeText(projectData.description),
    '',
    'EXPECTED FUNCTIONALITY',
    safeText(projectData.expectedFunctionality),
    '',
    'RECOMMENDED APPROACH',
    safeText(result.recommended_approach),
    ...listLines('SYSTEM FLOW', result.system_flow),
    ...listLines('BUILD PLAN', result.implementation_phases),
    ...listLines('REQUIRED SENSORS', result.required_sensors),
    ...listLines('OUTPUTS', result.actuators_outputs),
    '',
    'POWER ADVICE',
    safeText(result.power_advice),
    '',
    'SELECTED COMPONENTS',
    ...componentLines(components),
    '',
    `AVAILABLE CATALOG SUBTOTAL: ${catalogSubtotal > 0 ? formatPriceLkr(catalogSubtotal) : 'Please confirm'}`,
    ...listLines('ENGINEERING RISKS', result.engineering_risks),
    ...listLines('BEGINNER TIPS', result.beginner_tips),
    '',
    'Note: AI suggestions are for planning. Confirm component compatibility, availability, and final prices with Spark Lab before purchasing.',
  ]

  return lines.filter((line) => line !== undefined).join('\n')
}

function triggerDownload(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function downloadProjectPlanText(plan) {
  triggerDownload(plan.text, `${filenamePart(plan.projectName)}-spark-lab-plan.txt`, 'text/plain;charset=utf-8')
}

export function downloadProjectPlanWord(plan) {
  const sections = plan.text.split('\n\n').map((section) => `<p>${escapeHtml(section).replace(/\n/g, '<br>')}</p>`).join('')
  const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(plan.projectName)}</title><style>body{font-family:Arial,sans-serif;color:#102033;line-height:1.55;margin:42px;max-width:760px}p{white-space:normal;margin:0 0 18px}p:first-child{color:#0A2747;font-size:24px;font-weight:700}p:nth-child(2){color:#F2B43A;font-weight:700}</style></head><body>${sections}</body></html>`
  triggerDownload(documentHtml, `${filenamePart(plan.projectName)}-spark-lab-plan.doc`, 'application/msword')
}

export function printProjectPlanPdf(plan) {
  const printWindow = globalThis.open('', '_blank')
  if (!printWindow) return false

  printWindow.opener = null

  const sections = plan.text.split('\n\n').map((section) => `<p>${escapeHtml(section).replace(/\n/g, '<br>')}</p>`).join('')
  printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(plan.projectName)}</title><style>@page{margin:18mm}body{font-family:Arial,sans-serif;color:#102033;line-height:1.55;margin:0;max-width:760px}p{margin:0 0 16px}p:first-child{color:#0A2747;font-size:24px;font-weight:700}p:nth-child(2){color:#C88A12;font-weight:700}@media print{body{font-size:11pt}}</style></head><body>${sections}<script>window.addEventListener('load',()=>window.print())</script></body></html>`)
  printWindow.document.close()
  return true
}
