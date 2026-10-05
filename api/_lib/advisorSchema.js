export const advisorResponseSchema = {
  type: 'object',
  properties: {
    project_summary: { type: 'string' },
    recommended_approach: { type: 'string' },
    difficulty: { type: 'string' },
    recommended_platform: { type: 'string' },
    required_components: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          category: { type: 'string' },
          quantity: { type: 'integer' },
          reason: { type: 'string' },
        },
        required: ['name', 'category', 'quantity', 'reason'],
      },
    },
    optional_components: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          category: { type: 'string' },
          quantity: { type: 'integer' },
          reason: { type: 'string' },
        },
        required: ['name', 'category', 'quantity', 'reason'],
      },
    },
    technical_considerations: { type: 'array', items: { type: 'string' } },
    clarifying_questions: { type: 'array', items: { type: 'string' } },
    estimated_budget_note: { type: 'string' },
    next_steps: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'project_summary',
    'recommended_approach',
    'difficulty',
    'recommended_platform',
    'required_components',
    'optional_components',
    'technical_considerations',
    'clarifying_questions',
    'estimated_budget_note',
    'next_steps',
  ],
}

function cleanString(value) {
  return String(value ?? '').trim()
}

function cleanList(value, limit = 12) {
  return Array.isArray(value) ? value.map(cleanString).filter(Boolean).slice(0, limit) : []
}

function cleanComponents(value) {
  if (!Array.isArray(value)) return []

  return value.slice(0, 20).map((component) => ({
    name: cleanString(component?.name) || 'Component to confirm',
    category: cleanString(component?.category) || 'Components',
    quantity: Math.max(1, Math.min(20, Math.floor(Number(component?.quantity) || 1))),
    reason: cleanString(component?.reason),
  }))
}

export function validateAdvisorOutput(value) {
  if (!value || typeof value !== 'object') throw new Error('Invalid advisor output')

  const normalized = {
    project_summary: cleanString(value.project_summary),
    recommended_approach: cleanString(value.recommended_approach),
    difficulty: cleanString(value.difficulty) || 'Needs Confirmation',
    recommended_platform: cleanString(value.recommended_platform) || 'Needs Confirmation',
    required_components: cleanComponents(value.required_components),
    optional_components: cleanComponents(value.optional_components),
    technical_considerations: cleanList(value.technical_considerations),
    clarifying_questions: cleanList(value.clarifying_questions),
    estimated_budget_note: cleanString(value.estimated_budget_note),
    next_steps: cleanList(value.next_steps),
  }

  if (
    !normalized.project_summary ||
    !normalized.recommended_approach ||
    normalized.required_components.length === 0
  ) {
    throw new Error('Incomplete advisor output')
  }

  return normalized
}
