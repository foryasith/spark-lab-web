function cleanString(value) {
  return String(value ?? '').trim()
}

function cleanStringList(value) {
  return Array.isArray(value) ? value.map(cleanString).filter(Boolean).slice(0, 12) : []
}

function cleanComponents(value) {
  if (!Array.isArray(value)) return []

  return value.slice(0, 20).map((component) => ({
    name: cleanString(component?.name) || 'Component to confirm',
    category: cleanString(component?.category) || 'Components',
    quantity: Math.max(1, Math.min(20, Math.floor(Number(component?.quantity) || 1))),
    reason: cleanString(component?.reason),
    catalog_status: 'needs-confirmation',
  }))
}

export function normalizeAdvisorResponse(value) {
  if (!value || typeof value !== 'object') {
    throw new Error('The project advisor returned an invalid response.')
  }

  const normalized = {
    project_summary: cleanString(value.project_summary),
    recommended_approach: cleanString(value.recommended_approach),
    difficulty: cleanString(value.difficulty) || 'Needs Confirmation',
    recommended_platform: cleanString(value.recommended_platform) || 'Needs Confirmation',
    required_components: cleanComponents(value.required_components),
    optional_components: cleanComponents(value.optional_components),
    technical_considerations: cleanStringList(value.technical_considerations),
    clarifying_questions: cleanStringList(value.clarifying_questions),
    estimated_budget_note: cleanString(value.estimated_budget_note),
    next_steps: cleanStringList(value.next_steps),
  }

  if (
    !normalized.project_summary ||
    !normalized.recommended_approach ||
    normalized.required_components.length === 0
  ) {
    throw new Error('The project advisor response is incomplete.')
  }

  return normalized
}
