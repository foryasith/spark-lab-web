import { useState } from 'react'
import {
  Blocks,
  Bot,
  CircleHelp,
  ClipboardList,
  Cpu,
  MessageCircle,
  Wrench,
} from 'lucide-react'
import SupportAreaCard from '../components/support/SupportAreaCard'
import useSeo from '../hooks/useSeo'
import { createProjectSupportUrl } from '../utils/whatsapp'
import './ProjectSupport.css'

const supportAreas = [
  {
    title: 'Component Selection',
    description: 'Identify suitable boards, sensors and modules for your idea.',
    Icon: Cpu,
  },
  {
    title: 'Project Planning',
    description: 'Break a project into practical stages and component requirements.',
    Icon: ClipboardList,
  },
  {
    title: 'IoT & Robotics Guidance',
    description: 'Get direction for connected devices, automation and robot builds.',
    Icon: Bot,
  },
  {
    title: 'Prototype Support',
    description: 'Plan a clean first prototype before moving toward a final build.',
    Icon: Blocks,
  },
  {
    title: 'Troubleshooting Guidance',
    description: 'Describe a build issue and get help identifying the next check.',
    Icon: Wrench,
  },
  {
    title: 'Beginner Support',
    description: 'Start with approachable guidance for your first electronics project.',
    Icon: CircleHelp,
  },
]

const projectTypes = [
  'IoT',
  'Robotics',
  'Arduino',
  'ESP32',
  'Electronics',
  'University Project',
  'School Project',
  'DIY / Hobby',
  'Other',
]

const projectStages = [
  'Just an idea',
  'Planning',
  'Buying components',
  'Building',
  'Testing',
  'Troubleshooting',
]

const initialFormData = {
  fullName: '',
  email: '',
  whatsappNumber: '',
  projectType: '',
  projectTitle: '',
  projectDescription: '',
  currentStage: '',
  componentsAvailable: '',
  helpNeeded: '',
}

function ProjectSupport() {
  useSeo({
    title: 'Project Assistance & Guidance | Spark Lab',
    description:
      'Get practical component advice, project planning support, and technical guidance for your maker projects.',
  })
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = {}
    if (!formData.fullName.trim()) validationErrors.fullName = 'Please enter your name.'
    if (!formData.projectType) validationErrors.projectType = 'Please select a project type.'
    if (!formData.projectDescription.trim()) {
      validationErrors.projectDescription = 'Please describe your project.'
    }

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    window.open(
      createProjectSupportUrl(formData),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="project-support-page tech-background">
      <section className="project-support-hero section">
        <div className="container">
          <span>Student &amp; Maker Support</span>
          <h1>Need Help With Your Project?</h1>
          <p>
            Tell us about your electronics, IoT or robotics idea. Spark Lab can
            help you understand the parts and practical next steps for your build.
          </p>
        </div>
      </section>

      <section className="support-areas-section section" aria-labelledby="support-areas-title">
        <div className="container">
          <div className="support-section-heading">
            <span>How We Can Help</span>
            <h2 id="support-areas-title">Support for Every Build Stage</h2>
          </div>
          <div className="support-areas-grid">
            {supportAreas.map(({ title, description, Icon }) => (
              <SupportAreaCard
                key={title}
                title={title}
                description={description}
                Icon={Icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="project-inquiry-section section" aria-labelledby="project-inquiry-title">
        <div className="container project-inquiry-layout">
          <div className="project-inquiry-copy">
            <span>Project Inquiry</span>
            <h2 id="project-inquiry-title">Tell Us About Your Build</h2>
            <p>
              Share what you are working on and where you need guidance. Your
              inquiry will open in WhatsApp, ready for you to review and send.
            </p>
            <div className="project-inquiry-note">
              <MessageCircle aria-hidden="true" size={21} />
              <p>
                Spark Lab provides practical component and project guidance. Any
                project advice should be tested carefully and safely by the builder.
              </p>
            </div>
          </div>

          <form className="project-support-form" onSubmit={handleSubmit} noValidate>
            <div className="support-form-grid">
              <div className="support-form-field">
                <label htmlFor="support-full-name">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="support-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'support-full-name-error' : undefined}
                />
                {errors.fullName && (
                  <small id="support-full-name-error" className="support-field-error">
                    {errors.fullName}
                  </small>
                )}
              </div>

              <div className="support-form-field">
                <label htmlFor="support-email">Email</label>
                <input
                  id="support-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="support-form-field">
                <label htmlFor="support-whatsapp">WhatsApp Number</label>
                <input
                  id="support-whatsapp"
                  name="whatsappNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="support-form-field">
                <label htmlFor="support-project-type">
                  Project Type <span aria-hidden="true">*</span>
                </label>
                <select
                  id="support-project-type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? 'support-project-type-error' : undefined}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((projectType) => (
                    <option key={projectType} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <small id="support-project-type-error" className="support-field-error">
                    {errors.projectType}
                  </small>
                )}
              </div>

              <div className="support-form-field support-form-field-wide">
                <label htmlFor="support-project-title">Project Title</label>
                <input
                  id="support-project-title"
                  name="projectTitle"
                  type="text"
                  value={formData.projectTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="support-form-field support-form-field-wide">
                <label htmlFor="support-project-description">
                  Project Description <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="support-project-description"
                  name="projectDescription"
                  rows="5"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="What are you trying to build?"
                  aria-invalid={Boolean(errors.projectDescription)}
                  aria-describedby={
                    errors.projectDescription
                      ? 'support-project-description-error'
                      : undefined
                  }
                />
                {errors.projectDescription && (
                  <small
                    id="support-project-description-error"
                    className="support-field-error"
                  >
                    {errors.projectDescription}
                  </small>
                )}
              </div>

              <div className="support-form-field">
                <label htmlFor="support-current-stage">Current Stage</label>
                <select
                  id="support-current-stage"
                  name="currentStage"
                  value={formData.currentStage}
                  onChange={handleChange}
                >
                  <option value="">Select current stage</option>
                  {projectStages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              <div className="support-form-field">
                <label htmlFor="support-components">Components Already Available</label>
                <input
                  id="support-components"
                  name="componentsAvailable"
                  type="text"
                  value={formData.componentsAvailable}
                  onChange={handleChange}
                  placeholder="e.g. ESP32, sensors"
                />
              </div>

              <div className="support-form-field support-form-field-wide">
                <label htmlFor="support-help-needed">What Help Do You Need?</label>
                <textarea
                  id="support-help-needed"
                  name="helpNeeded"
                  rows="4"
                  value={formData.helpNeeded}
                  onChange={handleChange}
                  placeholder="Component selection, planning, troubleshooting..."
                />
              </div>
            </div>

            <button className="btn btn-secondary support-submit-button" type="submit">
              <MessageCircle aria-hidden="true" size={19} />
              Continue on WhatsApp
            </button>
            <p className="support-form-privacy">
              This form does not store or send your information to a server. It
              prepares a message that you choose whether to send in WhatsApp.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ProjectSupport
