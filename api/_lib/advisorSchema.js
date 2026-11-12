export const advisorResponseSchema = {
  type: 'object',
  properties: {
    project_summary: { type: 'string' },
    recommended_approach: { type: 'string' },
    difficulty: { type: 'string' },
    recommended_platform: { type: 'string' },
    recommended_controller_reason: { type: 'string' },
    required_sensors: {
      type: 'array',
      items: {
        type: 'object',
        properties: { name: { type: 'string' }, reason: { type: 'string' } },
        required: ['name', 'reason'],
      },
    },
    actuators_outputs: {
      type: 'array',
      items: {
        type: 'object',
        properties: { name: { type: 'string' }, reason: { type: 'string' } },
        required: ['name', 'reason'],
      },
    },
    communication_method: { type: 'string' },
    power_advice: { type: 'string' },
    feasibility_assessment: { type: 'string' },
    assumptions: { type: 'array', items: { type: 'string' } },
    engineering_risks: { type: 'array', items: { type: 'string' } },
    implementation_phases: { type: 'array', items: { type: 'string' } },
    research_considerations: { type: 'array', items: { type: 'string' } },
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
    system_flow: { type: 'array', items: { type: 'string' } },
    beginner_tips: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'project_summary',
    'recommended_approach',
    'difficulty',
    'recommended_platform',
    'recommended_controller_reason',
    'required_sensors',
    'actuators_outputs',
    'communication_method',
    'power_advice',
    'feasibility_assessment',
    'assumptions',
    'engineering_risks',
    'implementation_phases',
    'research_considerations',
    'required_components',
    'optional_components',
    'technical_considerations',
    'clarifying_questions',
    'estimated_budget_note',
    'next_steps',
    'system_flow',
    'beginner_tips',
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

function cleanAdviceItems(value) {
  if (!Array.isArray(value)) return []

  return value.slice(0, 12).map((item) => ({
    name: cleanString(item?.name) || 'To confirm',
    reason: cleanString(item?.reason) || 'Confirm the exact requirement before purchasing.',
  }))
}

export function validateAdvisorOutput(value) {
  if (!value || typeof value !== 'object') throw new Error('Invalid advisor output')

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
    feasibility_assessment: cleanString(value.feasibility_assessment),
    assumptions: cleanList(value.assumptions),
    engineering_risks: cleanList(value.engineering_risks),
    implementation_phases: cleanList(value.implementation_phases),
    research_considerations: cleanList(value.research_considerations),
    required_components: cleanComponents(value.required_components),
    optional_components: cleanComponents(value.optional_components),
    technical_considerations: cleanList(value.technical_considerations),
    clarifying_questions: cleanList(value.clarifying_questions),
    estimated_budget_note: cleanString(value.estimated_budget_note),
    next_steps: cleanList(value.next_steps),
    system_flow: cleanList(value.system_flow),
    beginner_tips: cleanList(value.beginner_tips),
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
