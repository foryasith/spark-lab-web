import { useEffect, useMemo, useState } from 'react'
import {
  BellRing,
  Bot,
  BookOpen,
  CarFront,
  CloudSun,
  DoorOpen,
  Droplets,
  Fan,
  Flame,
  Hand,
  HeartPulse,
  House,
  LayoutGrid,
  Lamp,
  Leaf,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  PencilLine,
  RadioTower,
  ShoppingCart,
  Sprout,
  Trash2,
  Waves,
} from 'lucide-react'
import AiProjectAdvisor from '../components/project/AiProjectAdvisor'
import ProjectCard from '../components/project/ProjectCard'
import ProjectComponentList from '../components/project/ProjectComponentList'
import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import LoadingState from '../components/common/LoadingState'
import { projects } from '../data/projects'
import useCatalog from '../hooks/useCatalog'
import useCart from '../hooks/useCart'
import useSeo from '../hooks/useSeo'
import analytics from '../utils/analytics'
import { createWhatsAppUrl } from '../utils/whatsapp'
import './ProjectBuilder.css'

const projectIcons = {
  'street-light': Lamp,
  door: DoorOpen,
  dustbin: Trash2,
  fan: Fan,
  fire: Flame,
  greenhouse: Leaf,
  health: HeartPulse,
  home: House,
  leak: Droplets,
  learning: BookOpen,
  lock: LockKeyhole,
  parking: CarFront,
  pump: Waves,
  robot: Bot,
  plant: Sprout,
  sanitizer: Hand,
  water: BellRing,
  weather: CloudSun,
  rfid: RadioTower,
}

function ProjectBuilder() {
  useSeo({
    title: 'AI Project Builder & Component Advisor | Spark Lab',
    description:
      'Get AI recommendations for your electronics and IoT project ideas, match catalog components, and submit request lists to Spark Lab.',
  })
  const [builderMode, setBuilderMode] = useState('explore')

  useEffect(() => {
    analytics.trackProjectBuilderOpened(builderMode)
  }, [builderMode])
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id)
  const [projectComponentSelection, setProjectComponentSelection] = useState({
    projectId: null,
    slugs: new Set(),
  })
  const [cartMessage, setCartMessage] = useState('')
  const { addToCart } = useCart()
  const { products, isLoading, error, reload } = useCatalog()

  const activeProductsBySlug = useMemo(
    () =>
      new Map(
        products.map((product) => [product.slug, product]),
      ),
    [products],
  )

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  const defaultProjectProductSlugs = useMemo(() => {
    if (!selectedProject) return new Set()

    return new Set(
      [...selectedProject.requiredComponents, ...selectedProject.optionalComponents]
        .map((component) => activeProductsBySlug.get(component.productSlug))
        .filter((product) => product?.in_stock)
        .map((product) => product.slug),
    )
  }, [activeProductsBySlug, selectedProject])

  const selectedProductSlugs =
    projectComponentSelection.projectId === selectedProject?.id
      ? projectComponentSelection.slugs
      : defaultProjectProductSlugs

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
          .filter((product) => selectedProductSlugs.has(product.slug))
          .map((product) => [product.product_id, product]),
      ).values(),
    ]
  }, [activeProductsBySlug, selectedProject, selectedProductSlugs])

  const unavailableProjectComponents = useMemo(() => {
    if (!selectedProject) return []

    return [...selectedProject.requiredComponents, ...selectedProject.optionalComponents].filter(
      (component) => {
        const product = component.productSlug
          ? activeProductsBySlug.get(component.productSlug)
          : null
        return !product || !product.in_stock
      },
    )
  }, [activeProductsBySlug, selectedProject])

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId)
    setProjectComponentSelection({ projectId: null, slugs: new Set() })
    setCartMessage('')
  }

  const handleToggleProduct = (productSlug) => {
    setProjectComponentSelection((currentSelection) => {
      const currentSlugs =
        currentSelection.projectId === selectedProject?.id
          ? currentSelection.slugs
          : defaultProjectProductSlugs
      const nextSlugs = new Set(currentSlugs)
      if (nextSlugs.has(productSlug)) nextSlugs.delete(productSlug)
      else nextSlugs.add(productSlug)
      return { projectId: selectedProject?.id ?? null, slugs: nextSlugs }
    })
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

  const missingPartsRequestUrl = selectedProject
    ? createWhatsAppUrl([
        'Hello Spark Lab,',
        '',
        `I need help finding parts for this project: ${selectedProject.name}`,
        '',
        'Parts to confirm:',
        ...unavailableProjectComponents.map((component, index) => `${index + 1}. ${component.name}`),
        '',
        'Please confirm suitable compatible components and availability.',
        '',
        'Thank you.',
      ].join('\n'))
    : ''

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

          {isLoading ? (
            <LoadingState message="Loading project components..." />
          ) : error ? (
            <ErrorState onRetry={reload} />
          ) : projects.length > 0 ? (
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

          {selectedProject && !isLoading && !error && (
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
                selectedProductSlugs={selectedProductSlugs}
                onToggleProduct={handleToggleProduct}
              />
              <ProjectComponentList
                title="Optional Components"
                components={selectedProject.optionalComponents}
                productsBySlug={activeProductsBySlug}
                selectedProductSlugs={selectedProductSlugs}
                onToggleProduct={handleToggleProduct}
              />
            </div>

            {unavailableProjectComponents.length > 0 && (
              <a
                className="btn btn-outline project-missing-parts-button"
                href={missingPartsRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" size={17} />
                Request Missing Parts
              </a>
            )}

            {selectedProject.projectFunctions && (
              <section
                className="project-function-summary"
                aria-label="Assignment requirements covered by this project"
              >
                <div>
                  <span>Sensor / Input</span>
                  <p>{selectedProject.projectFunctions.input}</p>
                </div>
                <div>
                  <span>Output</span>
                  <p>{selectedProject.projectFunctions.output}</p>
                </div>
                <div>
                  <span>Memory / Data</span>
                  <p>{selectedProject.projectFunctions.memory}</p>
                </div>
              </section>
            )}

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

            <AiProjectAdvisor />
          </div>
        </section>
      )}
    </div>
  )
}

export default ProjectBuilder
