import { requestGeminiProjectAdvice } from './_lib/geminiProjectAdvisor.js'

const allowedExperienceLevels = new Set(['Beginner', 'Intermediate', 'Advanced', 'Not Sure'])

function cleanText(value, maximumLength) {
  return String(value ?? '').trim().slice(0, maximumLength)
}

function validateRequestBody(value) {
  if (!value || typeof value !== 'object') throw new Error('Invalid request body')

  const projectData = {
    projectName: cleanText(value.projectName, 120),
    description: cleanText(value.description, 2500),
    expectedFunctionality: cleanText(value.expectedFunctionality, 2500),
    experienceLevel: cleanText(value.experienceLevel, 40) || 'Not Sure',
    preferredPlatform: cleanText(value.preferredPlatform, 80) || 'No Preference',
    budgetRange: cleanText(value.budgetRange, 80) || 'Not Sure',
    existingComponents: cleanText(value.existingComponents, 1000),
    specialRequirements: cleanText(value.specialRequirements, 1000),
    requirements: Array.isArray(value.requirements)
      ? value.requirements.map((item) => cleanText(item, 80)).filter(Boolean).slice(0, 20)
      : [],
    clarificationAnswers:
      value.clarificationAnswers && typeof value.clarificationAnswers === 'object'
        ? Object.fromEntries(
            Object.entries(value.clarificationAnswers)
              .slice(0, 4)
              .map(([question, answer]) => [cleanText(question, 300), cleanText(answer, 800)])
              .filter(([question, answer]) => question && answer),
          )
        : {},
  }

  if (!projectData.description || !projectData.expectedFunctionality) {
    throw new Error('Project description and expected functionality are required')
  }

  if (!allowedExperienceLevels.has(projectData.experienceLevel)) {
    projectData.experienceLevel = 'Not Sure'
  }

  return projectData
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.info('Spark Lab Project Advisor: GEMINI_API_KEY is not configured.')
    return response.status(503).json({
      error: 'The project advisor is not configured in this environment.',
      code: 'ADVISOR_NOT_CONFIGURED',
    })
  }

  try {
    const projectData = validateRequestBody(request.body)
    const result = await requestGeminiProjectAdvice(projectData, {
      apiKey,
      model: process.env.GEMINI_MODEL,
      thinkingBudget: process.env.GEMINI_THINKING_BUDGET,
    })
    return response.status(200).json({ result })
  } catch (error) {
    console.error('Spark Lab Project Advisor request failed:', error.message)
    return response.status(502).json({
      error: 'The project advisor could not complete this request.',
      code: 'ADVISOR_REQUEST_FAILED',
    })
  }
}
