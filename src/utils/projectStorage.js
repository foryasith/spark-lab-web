import { initialProjectIdea, normalizeProjectIdea } from './projectIdea.js'

export const PROJECT_DRAFT_STORAGE_KEY = 'spark-lab-project-draft'
export const PROJECT_HISTORY_STORAGE_KEY = 'spark-lab-project-history'
export const PROJECT_HISTORY_LIMIT = 5

function getStorage(storage) {
  return storage ?? globalThis.localStorage
}

function hasMeaningfulDraft(projectData) {
  return (
    projectData.projectName ||
    projectData.description ||
    projectData.expectedFunctionality ||
    projectData.existingComponents ||
    projectData.specialRequirements ||
    projectData.requirements.length > 0 ||
    projectData.experienceLevel !== initialProjectIdea.experienceLevel ||
    projectData.preferredPlatform !== initialProjectIdea.preferredPlatform ||
    projectData.budgetRange !== initialProjectIdea.budgetRange
  )
}

export function loadProjectDraft(storage) {
  const storageTarget = getStorage(storage)
  if (!storageTarget) return { ...initialProjectIdea, requirements: [] }

  try {
    const storedDraft = storageTarget.getItem(PROJECT_DRAFT_STORAGE_KEY)
    if (!storedDraft) return { ...initialProjectIdea, requirements: [] }

    return normalizeProjectIdea({ ...initialProjectIdea, ...JSON.parse(storedDraft) })
  } catch {
    return { ...initialProjectIdea, requirements: [] }
  }
}

export function saveProjectDraft(projectData, storage) {
  const storageTarget = getStorage(storage)
  if (!storageTarget) return false

  try {
    const normalizedDraft = normalizeProjectIdea(projectData)
    if (!hasMeaningfulDraft(normalizedDraft)) {
      storageTarget.removeItem(PROJECT_DRAFT_STORAGE_KEY)
      return true
    }

    storageTarget.setItem(PROJECT_DRAFT_STORAGE_KEY, JSON.stringify(normalizedDraft))
    return true
  } catch {
    return false
  }
}

export function clearProjectDraft(storage) {
  const storageTarget = getStorage(storage)
  if (!storageTarget) return false

  try {
    storageTarget.removeItem(PROJECT_DRAFT_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

function normalizeHistoryEntry(entry) {
  const id = String(entry?.id ?? '').trim()
  const projectName = String(entry?.projectName ?? '').trim() || 'Custom project idea'
  const createdAt = String(entry?.createdAt ?? '').trim()
  const summary = String(entry?.summary ?? '').trim().slice(0, 240)

  if (!id || !createdAt) return null
  return { id, projectName, createdAt, summary }
}

export function loadRecentProjectRequests(storage) {
  const storageTarget = getStorage(storage)
  if (!storageTarget) return []

  try {
    const storedHistory = storageTarget.getItem(PROJECT_HISTORY_STORAGE_KEY)
    if (!storedHistory) return []

    const parsedHistory = JSON.parse(storedHistory)
    if (!Array.isArray(parsedHistory)) return []

    return parsedHistory
      .map(normalizeHistoryEntry)
      .filter(Boolean)
      .slice(0, PROJECT_HISTORY_LIMIT)
  } catch {
    return []
  }
}

export function addRecentProjectRequest(request, storage) {
  const storageTarget = getStorage(storage)
  const normalizedRequest = normalizeHistoryEntry(request)
  if (!storageTarget || !normalizedRequest) return loadRecentProjectRequests(storageTarget)

  const nextHistory = [
    normalizedRequest,
    ...loadRecentProjectRequests(storageTarget).filter(
      (item) => item.id !== normalizedRequest.id,
    ),
  ].slice(0, PROJECT_HISTORY_LIMIT)

  try {
    storageTarget.setItem(PROJECT_HISTORY_STORAGE_KEY, JSON.stringify(nextHistory))
  } catch {
    return loadRecentProjectRequests(storageTarget)
  }

  return nextHistory
}

export function clearRecentProjectRequests(storage) {
  const storageTarget = getStorage(storage)
  if (!storageTarget) return false

  try {
    storageTarget.removeItem(PROJECT_HISTORY_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}
