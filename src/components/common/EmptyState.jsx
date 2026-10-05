import { PackageOpen } from 'lucide-react'
import './UiState.css'

function EmptyState({
  title,
  message,
  action,
  Icon = PackageOpen,
  headingLevel = 'h2',
  className = '',
}) {
  const Heading = headingLevel

  return (
    <div className={`ui-state ui-empty-state ${className}`.trim()}>
      <span className="ui-state-icon">
        <Icon aria-hidden="true" size={34} strokeWidth={1.5} />
      </span>
      <Heading>{title}</Heading>
      {message && <p>{message}</p>}
      {action && <div className="ui-state-action">{action}</div>}
    </div>
  )
}

export default EmptyState
