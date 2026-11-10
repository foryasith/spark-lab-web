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

function cleanAdviceItems(value) {
  if (!Array.isArray(value)) return []

  return value.slice(0, 12).map((item) => ({
    name: cleanString(item?.name) || 'To confirm',
    reason: cleanString(item?.reason) || 'Confirm the exact requirement before purchasing.',
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
    recommended_controller_reason: cleanString(value.recommended_controller_reason),
    required_sensors: cleanAdviceItems(value.required_sensors),
    actuators_outputs: cleanAdviceItems(value.actuators_outputs),
    communication_method: cleanString(value.communication_method),
    power_advice: cleanString(value.power_advice),
    required_components: cleanComponents(value.required_components),
    optional_components: cleanComponents(value.optional_components),
    technical_considerations: cleanStringList(value.technical_considerations),
    clarifying_questions: cleanStringList(value.clarifying_questions),
    estimated_budget_note: cleanString(value.estimated_budget_note),
    next_steps: cleanStringList(value.next_steps),
    system_flow: cleanStringList(value.system_flow),
    beginner_tips: cleanStringList(value.beginner_tips),
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
