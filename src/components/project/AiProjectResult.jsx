import {
  CircleHelp,
  Cpu,
  Gauge,
  Lightbulb,
  MessageCircle,
  Route,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react'
import analytics from '../../utils/analytics'
import { formatPriceLkr } from '../../utils/formatPrice'
import './AiProjectResult.css'

function Accordion({ title, items, Icon, open = false }) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <details className="ai-workspace-accordion" open={open}>
      <summary><Icon aria-hidden="true" size={17} /> {title}</summary>
      <ul>{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
    </details>
  )
}

function CompactComponentList({ components, selectedComponentIds, onToggleComponent }) {
  if (components.length === 0) return <p className="ai-sidebar-empty">No components suggested yet.</p>

  return (
    <div className="ai-compact-components" aria-label="Suggested project components">
      {components.map((component) => {
        const quantity = Math.max(1, Number(component.recommendation?.quantity) || 1)
        const isSelected = selectedComponentIds.has(component.id)
        const name = component.recommendation?.name || 'Component to confirm'

        return (
          <label className={isSelected ? 'is-selected' : ''} key={component.id}>
            <input type="checkbox" checked={isSelected} onChange={() => onToggleComponent(component.id)} />
            <span>{name}{quantity > 1 ? ` ×${quantity}` : ''}</span>
          </label>
        )
      })}
    </div>
  )
}

function AiProjectResult({
  result,
  matchedComponents,
  selectedComponentIds,
  onToggleComponent,
  onAddAvailableParts,
  cartMessage,
  missingRequestUrl,
  fullRequestUrl,
  onSendFullRequest,
  clarificationAnswers,
  onClarificationAnswerChange,
  onRefinePlan,
  isRefining,
  projectName,
}) {
  const selectedComponents = matchedComponents.filter((component) => selectedComponentIds.has(component.id))
  const selectedAvailable = selectedComponents.filter((component) => component.product?.in_stock)
  const selectedMissing = selectedComponents.filter((component) => !component.product)
  const catalogSubtotal = selectedAvailable.reduce((total, component) => {
    const price = Number(component.product?.price_lkr)
    const quantity = Math.max(1, Number(component.recommendation?.quantity) || 1)
    return Number.isFinite(price) ? total + price * quantity : total
  }, 0)

  return (
    <div className="ai-project-result">
      <header className="ai-result-overview">
        <div className="ai-result-overview-heading">
          <div>
            <span>Spark Lab AI Engineering Brief</span>
            <h3>{projectName || 'Your Project Plan'}</h3>
          </div>
          <span className="ai-result-status">Analysis ready</span>
        </div>
        <p>{result.project_summary}</p>
        <div className="ai-result-badges">
          <span><Gauge aria-hidden="true" size={14} /> {result.difficulty}</span>
          <span><Cpu aria-hidden="true" size={14} /> {result.recommended_platform}</span>
          <span>IoT / Embedded</span>
        </div>
      </header>

      <div className="ai-result-workspace">
        <main className="ai-workspace-main">
          <section className="ai-workspace-card">
            <h4><Route aria-hidden="true" size={18} /> Recommended Approach</h4>
            <p>{result.recommended_approach}</p>
          </section>

          <section className="ai-workspace-card">
            <h4><Route aria-hidden="true" size={18} /> Simple System Flow</h4>
            <div className="ai-system-flow" aria-label="Project system flow diagram">
              {result.system_flow.map((step, index) => (
                <div className="ai-system-flow-part" key={`${step}-${index}`}>
                  <div className="ai-flow-node">
                    <span>{index + 1}</span>
                    <strong>{step}</strong>
                  </div>
                  {index < result.system_flow.length - 1 && (
                    <span className="ai-flow-arrow" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="ai-workspace-card ai-engineering-snapshot">
            <h4><Cpu aria-hidden="true" size={18} /> Engineering Snapshot</h4>
            <div><span>Inputs</span><p>{result.required_sensors.map((sensor) => sensor.name).join(' · ') || 'To confirm'}</p></div>
            <div><span>Outputs</span><p>{result.actuators_outputs.map((output) => output.name).join(' · ') || 'To confirm'}</p></div>
            {result.communication_method && <div><span>Communication</span><p>{result.communication_method}</p></div>}
          </section>

          <div className="ai-workspace-accordions">
            <Accordion title="Engineering Risks & Validation" items={result.engineering_risks} Icon={ShieldCheck} open />
            <Accordion title="Practical Tips" items={result.beginner_tips} Icon={Lightbulb} />
            <Accordion title="Research Considerations" items={result.research_considerations} Icon={CircleHelp} />
          </div>
        </main>

        <aside className="ai-workspace-sidebar">
          <section className="ai-sidebar-card">
            <span className="ai-sidebar-label">Project Summary</span>
            <h4>{result.recommended_platform}</h4>
            <p>{result.recommended_controller_reason || result.feasibility_assessment}</p>
          </section>

          <section className="ai-sidebar-card">
            <span className="ai-sidebar-label">Components for This Build</span>
            <p className="ai-sidebar-helper">Select only the parts you want to add or request.</p>
            <CompactComponentList components={matchedComponents} selectedComponentIds={selectedComponentIds} onToggleComponent={onToggleComponent} />
          </section>

          {result.clarifying_questions.length > 0 && (
            <section className="ai-sidebar-card ai-refine-card">
              <span className="ai-sidebar-label">Refine with AI</span>
              <div className="ai-clarification-fields">
                {result.clarifying_questions.slice(0, 4).map((question) => (
                  <label key={question}>
                    <span>{question}</span>
                    <input type="text" value={clarificationAnswers?.[question] || ''} onChange={(event) => onClarificationAnswerChange(question, event.target.value)} placeholder="Your answer" />
                  </label>
                ))}
              </div>
              <button className="btn btn-secondary" type="button" onClick={onRefinePlan} disabled={isRefining}>
                {isRefining ? 'Refining Your Plan...' : 'Refine Plan'}
              </button>
            </section>
          )}

          <section className="ai-sidebar-card ai-catalog-card">
            <span className="ai-sidebar-label">Available Catalog Subtotal</span>
            <strong>{catalogSubtotal > 0 ? formatPriceLkr(catalogSubtotal) : 'Select available parts'}</strong>
            <small>Calculated only from currently matched, in-stock Spark Lab catalog items.</small>
          </section>

          <section className="ai-request-actions" aria-labelledby="ai-request-actions-title">
            <h4 id="ai-request-actions-title">Next Actions</h4>
            <button className="btn btn-secondary" type="button" onClick={onAddAvailableParts} disabled={selectedAvailable.length === 0}>
              <ShoppingCart aria-hidden="true" size={16} /> Add Available Parts
            </button>
            <a className={`btn btn-outline${selectedMissing.length === 0 ? ' is-disabled' : ''}`} href={selectedMissing.length > 0 ? missingRequestUrl : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={selectedMissing.length === 0} onClick={selectedMissing.length > 0 ? () => analytics.trackProjectRequest('missing', selectedMissing.length) : undefined}>
              <MessageCircle aria-hidden="true" size={16} /> Request Missing Parts
            </a>
            <a className={`btn btn-primary${selectedComponents.length === 0 ? ' is-disabled' : ''}`} href={selectedComponents.length > 0 ? fullRequestUrl : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={selectedComponents.length === 0} onClick={() => {
              if (selectedComponents.length > 0) {
                analytics.trackProjectRequest('full', selectedComponents.length)
                onSendFullRequest?.()
              }
            }}>
              <MessageCircle aria-hidden="true" size={16} /> Talk to Spark Lab
            </a>
            {cartMessage && <p className="ai-cart-message" role="status">{cartMessage}</p>}
          </section>
        </aside>
      </div>
    </div>
  )
}

export default AiProjectResult
