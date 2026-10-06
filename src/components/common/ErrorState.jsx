import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import './UiState.css'

function ErrorState({
  title = "We couldn't load the product catalog right now.",
  message = "Please check your internet connection or try refreshing the page.",
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
      {message && <p>{message}</p>}
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
      {!onRetry && !action && (
        <div className="ui-state-action">
          <Link className="btn btn-outline" to="/contact">
            Contact Spark Lab
          </Link>
        </div>
      )}
    </div>
  )
}

export default ErrorState
