import { CircleHelp, Cpu, Gauge, Lightbulb, ListChecks, Route, ShieldCheck } from 'lucide-react'
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

function AiProjectResult({ result }) {
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
          {result.required_components.map((component, index) => (
            <ComponentSuggestion key={`${component.name}-${index}`} component={component} />
          ))}
        </div>
      </section>

      {result.optional_components.length > 0 && (
        <section className="ai-advice-section">
          <h4><Lightbulb aria-hidden="true" size={17} /> Optional Components</h4>
          <div className="ai-component-list">
            {result.optional_components.map((component, index) => (
              <ComponentSuggestion key={`${component.name}-${index}`} component={component} />
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
    </div>
  )
}

export default AiProjectResult
