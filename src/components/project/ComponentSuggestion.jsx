import { Boxes } from 'lucide-react'
import './ComponentSuggestion.css'

const statusLabels = {
  available: 'Available from Spark Lab',
  similar: 'Similar Product Available',
  'not-listed': 'Not Currently Listed',
  'needs-confirmation': 'Needs Confirmation',
}

function ComponentSuggestion({ component }) {
  const status = statusLabels[component.catalog_status] ? component.catalog_status : 'needs-confirmation'

  return (
    <article className="component-suggestion">
      <span className="component-suggestion-icon">
        <Boxes aria-hidden="true" size={21} strokeWidth={1.6} />
      </span>
      <div>
        <div className="component-suggestion-heading">
          <h4>{component.name || 'Component to confirm'}</h4>
          <span>Qty {Number(component.quantity) > 0 ? Number(component.quantity) : 1}</span>
        </div>
        {component.category && <p className="component-suggestion-category">{component.category}</p>}
        {component.reason && <p>{component.reason}</p>}
        <span className={`component-status is-${status}`}>{statusLabels[status]}</span>
      </div>
    </article>
  )
}

export default ComponentSuggestion
