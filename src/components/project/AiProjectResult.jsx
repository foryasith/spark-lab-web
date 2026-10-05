import {
  CircleHelp,
  Cpu,
  Gauge,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Route,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react'
import ComponentSuggestion from './ComponentSuggestion'
import './AiProjectResult.css'

function AdviceList({ title, items, Icon }) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <section className="ai-advice-section">
      <h4><Icon aria-hidden="true" size={17} /> {title}</h4>
      <ul>
        {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
      </ul>
    </section>
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
}) {
  const requiredComponents = matchedComponents.filter((component) => component.group === 'required')
  const optionalComponents = matchedComponents.filter((component) => component.group === 'optional')
  const selectedComponents = matchedComponents.filter((component) => selectedComponentIds.has(component.id))
  const selectedAvailable = selectedComponents.filter((component) => component.product?.in_stock)
  const selectedMissing = selectedComponents.filter((component) => !component.product)

  return (
    <div className="ai-project-result">
      <div className="ai-result-overview">
        <span>Spark Lab AI Recommendation</span>
        <h3>Project Understanding</h3>
        <p>{result.project_summary}</p>
        <div className="ai-result-badges">
          <span><Gauge aria-hidden="true" size={14} /> {result.difficulty}</span>
          <span><Cpu aria-hidden="true" size={14} /> {result.recommended_platform}</span>
        </div>
      </div>

      <section className="ai-advice-section">
        <h4><Route aria-hidden="true" size={17} /> Suggested Architecture</h4>
        <p>{result.recommended_approach}</p>
      </section>

      <section className="ai-advice-section">
        <h4><ListChecks aria-hidden="true" size={17} /> Components You May Need</h4>
        <div className="ai-component-list">
          {requiredComponents.map((component) => (
            <ComponentSuggestion
              key={component.id}
              suggestion={component}
              isSelected={selectedComponentIds.has(component.id)}
              onToggle={onToggleComponent}
            />
          ))}
        </div>
      </section>

      {optionalComponents.length > 0 && (
        <section className="ai-advice-section">
          <h4><Lightbulb aria-hidden="true" size={17} /> Optional Components</h4>
          <div className="ai-component-list">
            {optionalComponents.map((component) => (
              <ComponentSuggestion
                key={component.id}
                suggestion={component}
                isSelected={selectedComponentIds.has(component.id)}
                onToggle={onToggleComponent}
              />
            ))}
          </div>
        </section>
      )}

      <AdviceList title="Things to Consider" items={result.technical_considerations} Icon={ShieldCheck} />
      <AdviceList title="Questions Before You Build" items={result.clarifying_questions} Icon={CircleHelp} />
      <AdviceList title="Next Steps" items={result.next_steps} Icon={ListChecks} />

      {result.estimated_budget_note && (
        <p className="ai-budget-note">{result.estimated_budget_note}</p>
      )}

      <section className="ai-request-actions" aria-labelledby="ai-request-actions-title">
        <h4 id="ai-request-actions-title">Generate Project Request</h4>
        <p>{selectedComponents.length} suggested components selected.</p>
        <div>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onAddAvailableParts}
            disabled={selectedAvailable.length === 0}
          >
            <ShoppingCart aria-hidden="true" size={16} />
            Add Available Parts to Cart
          </button>
          <a
            className={`btn btn-outline${selectedMissing.length === 0 ? ' is-disabled' : ''}`}
            href={selectedMissing.length > 0 ? missingRequestUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={selectedMissing.length === 0}
          >
            <MessageCircle aria-hidden="true" size={16} />
            Request Missing Components
          </a>
          <a
            className={`btn btn-primary${selectedComponents.length === 0 ? ' is-disabled' : ''}`}
            href={selectedComponents.length > 0 ? fullRequestUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={selectedComponents.length === 0}
          >
            <MessageCircle aria-hidden="true" size={16} />
            Send Full Project Request
          </a>
        </div>
        {cartMessage && <p className="ai-cart-message" role="status">{cartMessage}</p>}
        <small>
          AI suggestions are intended to help with planning. Confirm component
          compatibility and availability before placing an order.
        </small>
      </section>
    </div>
  )
}

export default AiProjectResult
