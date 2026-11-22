import { normalizeAdvisorResponse } from './advisorResponse.js'
import { normalizeProjectIdea } from './projectIdea.js'

export const PROJECT_ADVISOR_SESSION_STORAGE_KEY = 'spark-lab-project-advisor-session'

function getSessionStorage() {
  try {
    return globalThis.sessionStorage
  } catch {
    return null
  }
}

export function loadProjectAdvisorSession() {
  const storage = getSessionStorage()
  if (!storage) return null

  try {
    const saved = JSON.parse(storage.getItem(PROJECT_ADVISOR_SESSION_STORAGE_KEY) || 'null')
    if (!saved?.projectData || !saved?.result) return null

    return {
      projectData: normalizeProjectIdea(saved.projectData),
      result: normalizeAdvisorResponse(saved.result),
      selectedComponentIds: Array.isArray(saved.selectedComponentIds)
        ? saved.selectedComponentIds.map(String)
        : [],
      clarificationAnswers:
        saved.clarificationAnswers && typeof saved.clarificationAnswers === 'object'
          ? saved.clarificationAnswers
          : {},
    }
  } catch {
    return null
  }
}

export function saveProjectAdvisorSession(session) {
  const storage = getSessionStorage()
  if (!storage || !session?.projectData || !session?.result) return false

  try {
    storage.setItem(
      PROJECT_ADVISOR_SESSION_STORAGE_KEY,
      JSON.stringify({
        projectData: normalizeProjectIdea(session.projectData),
        result: session.result,
        selectedComponentIds: Array.from(session.selectedComponentIds || []),
        clarificationAnswers: session.clarificationAnswers || {},
      }),
    )
    return true
  } catch {
    return false
  }
}

export function clearProjectAdvisorSession() {
  const storage = getSessionStorage()
  if (!storage) return false

  try {
    storage.removeItem(PROJECT_ADVISOR_SESSION_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}
