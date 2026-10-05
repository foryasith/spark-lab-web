import { useMemo, useState } from 'react'
import {
  Bot,
  CloudSun,
  LayoutGrid,
  Lightbulb,
  PencilLine,
  RadioTower,
  ShoppingCart,
  Sprout,
} from 'lucide-react'
import CustomProjectIdeaBuilder from '../components/project/CustomProjectIdeaBuilder'
import ProjectCard from '../components/project/ProjectCard'
import ProjectComponentList from '../components/project/ProjectComponentList'
import EmptyState from '../components/common/EmptyState'
import { products } from '../data/products'
import { projects } from '../data/projects'
import useCart from '../hooks/useCart'
import './ProjectBuilder.css'

const projectIcons = {
  robot: Bot,
  plant: Sprout,
  weather: CloudSun,
  rfid: RadioTower,
}

function ProjectBuilder() {
  const [builderMode, setBuilderMode] = useState('explore')
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id)
  const [cartMessage, setCartMessage] = useState('')
  const [preparedProject, setPreparedProject] = useState(null)
  const { addToCart } = useCart()

  const activeProductsBySlug = useMemo(
    () =>
      new Map(
        products
          .filter((product) => product.active)
          .map((product) => [product.slug, product]),
      ),
    [],
  )

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  const availableProjectProducts = useMemo(() => {
    if (!selectedProject) return []

    const projectComponents = [
      ...selectedProject.requiredComponents,
      ...selectedProject.optionalComponents,
    ]

    return [
      ...new Map(
        projectComponents
          .map((component) => activeProductsBySlug.get(component.productSlug))
          .filter((product) => product?.in_stock)
          .map((product) => [product.product_id, product]),
      ).values(),
    ]
  }, [activeProductsBySlug, selectedProject])

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId)
    setCartMessage('')
  }

  const handleAddAvailableParts = () => {
    availableProjectProducts.forEach((product) => addToCart(product))
    setCartMessage(
      `${availableProjectProducts.length} available ${
        availableProjectProducts.length === 1 ? 'part' : 'parts'
      } added to your cart.`,
    )
  }

  return (
    <div className="project-builder-page tech-grid">
      <section className="project-builder-intro section">
        <div className="container">
          <span className="project-builder-eyebrow">Project Builder</span>
          <h1>Build Your Next Project</h1>
          <p>
            Choose a project idea, explore the suggested components and start
            turning what you learn into a working build.
          </p>
          <div className="project-builder-modes" role="tablist" aria-label="Project builder mode">
            <button
              type="button"
              role="tab"
              aria-selected={builderMode === 'explore'}
              className={builderMode === 'explore' ? 'is-active' : ''}
              onClick={() => setBuilderMode('explore')}
            >
              <LayoutGrid aria-hidden="true" size={18} />
              Explore Projects
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={builderMode === 'custom'}
              className={builderMode === 'custom' ? 'is-active' : ''}
              onClick={() => setBuilderMode('custom')}
            >
              <PencilLine aria-hidden="true" size={18} />
              Build Your Own Idea
            </button>
          </div>
        </div>
      </section>

      {builderMode === 'explore' ? (
        <section className="project-builder-content section" aria-labelledby="project-ideas-title">
        <div className="container">
          <div className="project-builder-section-heading">
            <div>
              <span>Choose a build</span>
              <h2 id="project-ideas-title">Project Ideas</h2>
            </div>
            <p>Start with one of these practical student and maker projects.</p>
          </div>

          {projects.length > 0 ? (
            <div className="project-builder-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  Icon={projectIcons[project.icon] ?? Lightbulb}
                  isSelected={project.id === selectedProject?.id}
                  onSelect={() => handleProjectSelect(project.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No project selected."
              message="New Spark Lab project ideas are being prepared."
            />
          )}

          {selectedProject && (
            <article className="project-build-details" aria-live="polite">
            <div className="project-build-heading">
              <div>
                <span>{selectedProject.difficulty} build</span>
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.description}</p>
              </div>
              {availableProjectProducts.length > 0 && (
                <div className="project-build-cart-action">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleAddAvailableParts}
                  >
                    <ShoppingCart aria-hidden="true" size={18} />
                    Add Available Parts to Cart
                  </button>
                  {cartMessage && <p role="status">{cartMessage}</p>}
                </div>
              )}
            </div>

            <div className="project-build-component-groups">
              <ProjectComponentList
                title="Required Components"
                components={selectedProject.requiredComponents}
                productsBySlug={activeProductsBySlug}
              />
              <ProjectComponentList
                title="Optional Components"
                components={selectedProject.optionalComponents}
                productsBySlug={activeProductsBySlug}
              />
            </div>

            <div className="project-learning-outcomes">
              <Lightbulb aria-hidden="true" size={22} />
              <div>
                <h3>What You Will Learn</h3>
                <ul>
                  {selectedProject.learningOutcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="project-availability-note">
              Suggested parts are development examples. Check each product page or
              contact Spark Lab to confirm compatibility and current availability.
            </p>
            </article>
          )}
        </div>
        </section>
      ) : (
        <section className="custom-project-section section" aria-labelledby="custom-project-title">
          <div className="container">
            <header className="project-builder-section-heading">
              <div>
                <span>Have Your Own Project Idea?</span>
                <h2 id="custom-project-title">Tell Us What You Want to Build</h2>
              </div>
              <p>
                Describe your idea and Spark Lab can help you identify the
                components and technology you may need.
              </p>
            </header>

            <CustomProjectIdeaBuilder onAnalyze={setPreparedProject}>
              {preparedProject && (
                <div className="custom-project-prepared">
                  <Lightbulb aria-hidden="true" size={30} strokeWidth={1.4} />
                  <strong>{preparedProject.projectName || 'Custom project idea'}</strong>
                  <p>
                    Your project details are validated and ready for the Spark Lab
                    Project Advisor in the next step.
                  </p>
                  <ul>
                    <li>{preparedProject.experienceLevel}</li>
                    <li>{preparedProject.preferredPlatform}</li>
                    <li>{preparedProject.budgetRange}</li>
                  </ul>
                </div>
              )}
            </CustomProjectIdeaBuilder>
          </div>
        </section>
      )}
    </div>
  )
}

export default ProjectBuilder
