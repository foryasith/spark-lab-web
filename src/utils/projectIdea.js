export const projectRequirementOptions = [
  'Wi-Fi',
  'Bluetooth',
  'GPS',
  'Mobile App',
  'Battery Powered',
  'Cloud',
  'Camera',
  'AI / ML',
  'Display',
  'Motor Control',
  'Real-time Monitoring',
]

export const initialProjectIdea = {
  projectName: '',
  description: '',
  expectedFunctionality: '',
  experienceLevel: 'Not Sure',
  preferredPlatform: 'No Preference',
  budgetRange: 'Not Sure',
  existingComponents: '',
  specialRequirements: '',
  requirements: [],
}

function cleanText(value) {
  return String(value ?? '').trim()
}

export function normalizeProjectIdea(formData) {
  return {
    projectName: cleanText(formData?.projectName),
    description: cleanText(formData?.description),
    expectedFunctionality: cleanText(formData?.expectedFunctionality),
    experienceLevel: cleanText(formData?.experienceLevel) || 'Not Sure',
    preferredPlatform: cleanText(formData?.preferredPlatform) || 'No Preference',
    budgetRange: cleanText(formData?.budgetRange) || 'Not Sure',
    existingComponents: cleanText(formData?.existingComponents),
    specialRequirements: cleanText(formData?.specialRequirements),
    requirements: Array.isArray(formData?.requirements)
      ? [...new Set(formData.requirements.map(cleanText).filter(Boolean))]
      : [],
  }
}

export function validateProjectIdea(projectData) {
  const errors = {}

  if (!projectData.description) {
    errors.description = 'Please describe your project idea.'
  }

  if (!projectData.expectedFunctionality) {
    errors.expectedFunctionality = 'Please explain what the project should do.'
  }

  return errors
}
