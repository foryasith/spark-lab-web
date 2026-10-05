import { AlertTriangle } from 'lucide-react'
import './UiState.css'

function ErrorState({
  title = 'Something went wrong.',
  message = "We couldn't load this content right now.",
  onRetry,
  action,
  headingLevel = 'h2',
  className = '',
}) {
  const Heading = headingLevel

  return (
    <div className={`ui-state ui-error-state ${className}`.trim()} role="alert">
      <span className="ui-state-icon">
        <AlertTriangle aria-hidden="true" size={34} strokeWidth={1.5} />
      </span>
      <Heading>{title}</Heading>
      <p>{message}</p>
      {(onRetry || action) && (
        <div className="ui-state-action">
          {onRetry && (
            <button className="btn btn-primary" type="button" onClick={onRetry}>
              Try Again
            </button>
          )}
          {action}
        </div>
      )}
    </div>
  )
}

export default ErrorState
