import { advisorResponseSchema, validateAdvisorOutput } from './advisorSchema.js'

const systemInstruction = `You are the Spark Lab Project Advisor.
Help users identify reasonable electronics, IoT and robotics components for a project.
Explain recommendations clearly, distinguish required and optional parts, identify uncertainty,
ask two to four short clarification questions only when the idea is unclear, and prioritize safe beginner-friendly recommendations.
Include a controller reason, required sensors, actuators or outputs, communication method,
power advice, a short ordered system flow, and practical beginner tips.
Never claim that a Spark Lab product is listed, in stock, or available.
Never invent Spark Lab prices, warranties, delivery dates, or exact project costs.
Catalog availability, price, stock and SKU are supplied by the storefront catalog only.
Return only structured JSON that matches the provided response schema.`

export async function requestGeminiProjectAdvice(projectData, options = {}) {
  const apiKey = options.apiKey
  const model = options.model || 'gemini-2.5-flash-lite'

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
