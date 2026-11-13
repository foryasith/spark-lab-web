import { useEffect } from 'react'
import { Lightbulb, MessageCircle, ShoppingCart, X } from 'lucide-react'
import ProjectComponentList from './ProjectComponentList'
import './ProjectBuildModal.css'

function ProjectBuildModal({
  isOpen,
  project,
  productsBySlug,
  selectedProductSlugs,
  onToggleProduct,
  availableProductCount,
  onAddAvailableParts,
  cartMessage,
  missingPartsRequestUrl,
  unavailableComponentCount,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div
      className="project-build-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="project-build-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <header className="project-build-modal-header">
          <div>
            <span>{project.difficulty} build</span>
            <h2 id="project-modal-title">{project.name}</h2>
            <p>{project.description}</p>
          </div>
          <button className="project-build-modal-close" type="button" onClick={onClose} aria-label="Close project details">
            <X aria-hidden="true" size={21} />
          </button>
        </header>

        <div className="project-build-modal-content">
          {availableProductCount > 0 && (
            <div className="project-build-cart-action">
              <button className="btn btn-secondary" type="button" onClick={onAddAvailableParts}>
                <ShoppingCart aria-hidden="true" size={18} />
                Add Available Parts to Cart
              </button>
              {cartMessage && <p role="status">{cartMessage}</p>}
            </div>
          )}

          <div className="project-build-component-groups">
            <ProjectComponentList title="Required Components" components={project.requiredComponents} productsBySlug={productsBySlug} selectedProductSlugs={selectedProductSlugs} onToggleProduct={onToggleProduct} />
            <ProjectComponentList title="Optional Components" components={project.optionalComponents} productsBySlug={productsBySlug} selectedProductSlugs={selectedProductSlugs} onToggleProduct={onToggleProduct} />
          </div>

          {unavailableComponentCount > 0 && (
            <a className="btn btn-outline project-missing-parts-button" href={missingPartsRequestUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={17} />
              Request Missing Parts
            </a>
          )}

          {project.projectFunctions && (
            <section className="project-function-summary" aria-label="Assignment requirements covered by this project">
              <div><span>Sensor / Input</span><p>{project.projectFunctions.input}</p></div>
              <div><span>Output</span><p>{project.projectFunctions.output}</p></div>
              <div><span>Memory / Data</span><p>{project.projectFunctions.memory}</p></div>
            </section>
          )}

          <div className="project-learning-outcomes">
            <Lightbulb aria-hidden="true" size={22} />
            <div>
              <h3>What You Will Learn</h3>
              <ul>{project.learningOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            </div>
          </div>
          <p className="project-availability-note">Suggested parts are development examples. Check each product page or contact Spark Lab to confirm compatibility and current availability.</p>
        </div>
      </section>
    </div>
  )
}

export default ProjectBuildModal
