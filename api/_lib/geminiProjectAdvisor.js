import { advisorResponseSchema, validateAdvisorOutput } from './advisorSchema.js'

const systemInstruction = `You are the Spark Lab Project Advisor, a senior IoT and embedded-systems research mentor.
Analyze every project request as a practical research prototype, not as a quick generic component list.
First reason internally about feasibility, constraints, sensing accuracy, controller limits, power, communications,
reliability, safety, data handling, testing, and a realistic first prototype. Do not reveal private chain-of-thought.
Give clear, specific conclusions and distinguish facts, assumptions, uncertainty, and items that require validation.
Include a controller reason, required sensors, actuators or outputs, communication method, power advice,
a short ordered system flow, implementation phases, engineering risks, research considerations, and practical beginner tips.
Ask two to four short clarification questions only when essential project details are missing.
Never claim that a Spark Lab product is listed, in stock, or available.
Never invent Spark Lab prices, warranties, delivery dates, or exact project costs.
Catalog availability, price, stock and SKU are supplied by the storefront catalog only.
Return only structured JSON that matches the provided response schema.`

function getThinkingConfig(model, thinkingBudget) {
  if (model.startsWith('gemini-2.5')) {
    const budget = Number(thinkingBudget)
    return {
      thinkingBudget: Number.isFinite(budget)
        ? Math.min(24576, Math.max(512, Math.floor(budget)))
        : 8192,
    }
  }

  return { thinkingLevel: 'high' }
}

export async function requestGeminiProjectAdvice(projectData, options = {}) {
  const apiKey = options.apiKey
  const model = options.model || 'gemini-2.5-flash'

  if (!apiKey) throw new Error('Gemini is not configured')

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Analyze this project request and return planning guidance:\n${JSON.stringify(projectData)}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          thinkingConfig: getThinkingConfig(model, options.thinkingBudget),
          responseMimeType: 'application/json',
          responseSchema: advisorResponseSchema,
        },
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const responseText = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || '')
    .join('')
    .trim()

  if (!responseText) throw new Error('Gemini returned an empty response')

  return validateAdvisorOutput(JSON.parse(responseText))
}
