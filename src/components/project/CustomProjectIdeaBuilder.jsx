import { BrainCircuit, Gauge, Lightbulb, Sparkles, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  initialProjectIdea,
  normalizeProjectIdea,
  validateProjectIdea,
} from '../../utils/projectIdea'
import {
  clearProjectDraft,
  loadProjectDraft,
  saveProjectDraft,
} from '../../utils/projectStorage'
import './CustomProjectIdeaBuilder.css'

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Not Sure']
const platformOptions = [
  'No Preference',
  'Arduino',
  'ESP32',
  'Raspberry Pi',
  'Other / Not Sure',
]
const budgetOptions = [
  'Not Sure',
  'Under Rs. 5,000',
  'Rs. 5,000 - 10,000',
  'Rs. 10,000 - 25,000',
  'Rs. 25,000+',
]

function CustomProjectIdeaBuilder({ onAnalyze, isAnalyzing = false, children }) {
  const [formData, setFormData] = useState(loadProjectDraft)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    saveProjectDraft(formData)
  }, [formData])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const projectData = normalizeProjectIdea(formData)
    const validationErrors = validateProjectIdea(projectData)

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0 || isAnalyzing) return

    onAnalyze?.(projectData)
  }

  const handleClearDraft = () => {
    clearProjectDraft()
    setFormData({ ...initialProjectIdea, requirements: [] })
    setErrors({})
  }

  return (
    <div className="custom-project-layout">
      <form className="custom-project-form" onSubmit={handleSubmit} noValidate>
        <div className="custom-project-step">
          <span><Lightbulb aria-hidden="true" size={17} /> Step 01</span>
          <h3>Describe Your Idea</h3>
        </div>

        <div className="custom-project-form-grid">
          <div className="custom-project-field custom-project-field-wide">
            <label htmlFor="custom-project-name">Project Name <small>Optional</small></label>
            <input
              id="custom-project-name"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={handleFieldChange}
              placeholder="e.g. Smart Helmet"
            />
          </div>

          <div className="custom-project-field custom-project-field-wide">
            <label htmlFor="custom-project-description">Project Idea / Description *</label>
            <textarea
              id="custom-project-description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleFieldChange}
              placeholder="Describe what you want to build and why."
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'custom-project-description-error' : undefined}
            />
            {errors.description && (
              <small className="custom-project-error" id="custom-project-description-error">
                {errors.description}
              </small>
            )}
          </div>

          <div className="custom-project-field custom-project-field-wide">
            <label htmlFor="custom-project-function">What should the project do? *</label>
            <textarea
              id="custom-project-function"
              name="expectedFunctionality"
              rows="4"
              value={formData.expectedFunctionality}
              onChange={handleFieldChange}
              placeholder="Explain the expected actions, alerts or results."
              aria-invalid={Boolean(errors.expectedFunctionality)}
              aria-describedby={
                errors.expectedFunctionality ? 'custom-project-function-error' : undefined
              }
            />
            {errors.expectedFunctionality && (
              <small className="custom-project-error" id="custom-project-function-error">
                {errors.expectedFunctionality}
              </small>
            )}
          </div>
        </div>

        <div className="custom-project-step">
          <span><Gauge aria-hidden="true" size={17} /> Step 02</span>
          <h3>Set Your Preferences</h3>
        </div>

        <div className="custom-project-form-grid">
          <div className="custom-project-field">
            <label htmlFor="custom-experience-level">Experience Level</label>
            <select
              id="custom-experience-level"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleFieldChange}
            >
              {experienceLevels.map((level) => <option key={level}>{level}</option>)}
            </select>
          </div>

          <div className="custom-project-field">
            <label htmlFor="custom-platform">Preferred Platform</label>
            <select
              id="custom-platform"
              name="preferredPlatform"
              value={formData.preferredPlatform}
              onChange={handleFieldChange}
            >
              {platformOptions.map((platform) => <option key={platform}>{platform}</option>)}
            </select>
          </div>

          <div className="custom-project-field custom-project-field-wide">
            <label htmlFor="custom-budget">Budget Range</label>
            <select
              id="custom-budget"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleFieldChange}
            >
              {budgetOptions.map((budget) => <option key={budget}>{budget}</option>)}
            </select>
            <small>For component guidance only. This is not an exact project cost.</small>
          </div>
        </div>

        <div className="custom-project-actions">
          <button className="btn btn-secondary custom-project-submit" type="submit" disabled={isAnalyzing}>
            <Sparkles aria-hidden="true" size={18} />
            {isAnalyzing ? 'Analyzing Your Project...' : 'Analyze My Project'}
          </button>
          <button className="btn btn-outline" type="button" onClick={handleClearDraft} disabled={isAnalyzing}>
            <Trash2 aria-hidden="true" size={16} />
            Clear Project Draft
          </button>
          <small>Your project draft is saved only on this device.</small>
        </div>
      </form>

      <aside className="custom-project-preview" aria-live="polite">
        <div className="custom-preview-heading">
          <span><BrainCircuit aria-hidden="true" size={18} /> Spark Lab Assistant</span>
          <h3>Project Analysis Preview</h3>
          <p>Get simple guidance, component suggestions and catalog-based pricing.</p>
        </div>
        {children ?? (
          <div className="custom-preview-empty">
            <Sparkles aria-hidden="true" size={30} strokeWidth={1.4} />
            <strong>Ready when you are</strong>
            <p>Describe your project and Spark Lab will guide your next steps.</p>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CustomProjectIdeaBuilder
