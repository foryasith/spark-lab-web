import {
  CircleHelp,
  Cpu,
  BatteryCharging,
  Cable,
  Gauge,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Route,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react'
import ComponentSuggestion from './ComponentSuggestion'
import analytics from '../../utils/analytics'
import { formatPriceLkr } from '../../utils/formatPrice'
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

function AdviceItems({ title, items, Icon }) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <section className="ai-advice-section">
      <h4><Icon aria-hidden="true" size={17} /> {title}</h4>
      <div className="ai-advice-items">
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`}>
            <strong>{item.name}</strong>
            <p>{item.reason}</p>
          </div>
        ))}
      </div>
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
  onSendFullRequest,
  clarificationAnswers,
  onClarificationAnswerChange,
  onRefinePlan,
  isRefining,
}) {
  const requiredComponents = matchedComponents.filter((component) => component.group === 'required')
  const optionalComponents = matchedComponents.filter((component) => component.group === 'optional')
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

      <section className="ai-advice-section ai-controller-advice">
        <h4><Cpu aria-hidden="true" size={17} /> Recommended Controller</h4>
        <strong>{result.recommended_platform}</strong>
        {result.recommended_controller_reason && <p>{result.recommended_controller_reason}</p>}
      </section>

      <AdviceItems title="Required Sensors" items={result.required_sensors} Icon={Gauge} />
      <AdviceItems title="Actuators & Outputs" items={result.actuators_outputs} Icon={Lightbulb} />

      {(result.communication_method || result.power_advice) && (
        <section className="ai-advice-section ai-project-facts">
          {result.communication_method && (
            <div>
              <h4><Cable aria-hidden="true" size={17} /> Communication</h4>
              <p>{result.communication_method}</p>
            </div>
          )}
          {result.power_advice && (
            <div>
              <h4><BatteryCharging aria-hidden="true" size={17} /> Power Advice</h4>
              <p>{result.power_advice}</p>
            </div>
          )}
        </section>
      )}

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
      {result.feasibility_assessment && (
        <section className="ai-advice-section ai-feasibility-section">
          <h4><ShieldCheck aria-hidden="true" size={17} /> Research Feasibility</h4>
          <p>{result.feasibility_assessment}</p>
        </section>
      )}
      <AdviceList title="Key Assumptions" items={result.assumptions} Icon={CircleHelp} />
      <AdviceList title="Engineering Risks & Validation" items={result.engineering_risks} Icon={ShieldCheck} />
      <AdviceList title="Suggested Implementation Phases" items={result.implementation_phases} Icon={ListChecks} />
      <AdviceList title="Research Considerations" items={result.research_considerations} Icon={Lightbulb} />
      <AdviceList title="Simple System Flow" items={result.system_flow} Icon={Route} />
      <AdviceList title="Beginner Tips" items={result.beginner_tips} Icon={Lightbulb} />

      {result.clarifying_questions.length > 0 && (
        <section className="ai-advice-section ai-clarification-section">
          <h4><CircleHelp aria-hidden="true" size={17} /> A Few Questions to Refine Your Plan</h4>
          <p>Answer what you can, then Spark Lab AI will refine these recommendations.</p>
          <div className="ai-clarification-fields">
            {result.clarifying_questions.slice(0, 4).map((question) => (
              <label key={question}>
                <span>{question}</span>
                <input
                  type="text"
                  value={clarificationAnswers?.[question] || ''}
                  onChange={(event) => onClarificationAnswerChange(question, event.target.value)}
                  placeholder="Your answer"
                />
              </label>
            ))}
          </div>
          <button className="btn btn-secondary" type="button" onClick={onRefinePlan} disabled={isRefining}>
            {isRefining ? 'Refining Your Plan...' : 'Refine My Plan'}
          </button>
        </section>
      )}

      <AdviceList title="Next Steps" items={result.next_steps} Icon={ListChecks} />

      {result.estimated_budget_note && (
        <p className="ai-budget-note">{result.estimated_budget_note}</p>
      )}

      {catalogSubtotal > 0 && (
        <p className="ai-catalog-total">
          Selected available parts from the Spark Lab catalog: <strong>{formatPriceLkr(catalogSubtotal)}</strong>
          <small>This is a component subtotal only; final compatibility and availability need confirmation.</small>
        </p>
      )}

      <section className="ai-request-actions" aria-labelledby="ai-request-actions-title">
        <h4 id="ai-request-actions-title">Need More Help With This Project?</h4>
        <p>Select available parts for your cart, or message Spark Lab for compatibility advice or complete project support.</p>
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
            onClick={
              selectedMissing.length > 0
                ? () => analytics.trackProjectRequest('missing', selectedMissing.length)
                : undefined
            }
          >
            <MessageCircle aria-hidden="true" size={16} />
            Request Missing Parts
          </a>
          <a
            className={`btn btn-primary${selectedComponents.length === 0 ? ' is-disabled' : ''}`}
            href={selectedComponents.length > 0 ? fullRequestUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={selectedComponents.length === 0}
            onClick={() => {
              if (selectedComponents.length > 0) {
                analytics.trackProjectRequest('full', selectedComponents.length)
                if (onSendFullRequest) onSendFullRequest()
              }
            }}
          >
            <MessageCircle aria-hidden="true" size={16} />
            Talk to Spark Lab About This Project
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
