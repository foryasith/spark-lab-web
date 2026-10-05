import { ArrowRight } from 'lucide-react'
import './ProjectCard.css'

function ProjectCard({ project, Icon, isSelected, onSelect }) {
  const componentCount =
    project.requiredComponents.length + project.optionalComponents.length

  return (
    <article className={`project-card${isSelected ? ' is-selected' : ''}`}>
      <span className="project-card-icon">
        <Icon aria-hidden="true" size={27} strokeWidth={1.6} />
      </span>
      <span className="project-difficulty">{project.difficulty}</span>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <span className="project-component-count">{componentCount} suggested components</span>
      <button type="button" onClick={onSelect} aria-pressed={isSelected}>
        View Build
        <ArrowRight aria-hidden="true" size={17} />
      </button>
    </article>
  )
}

export default ProjectCard
