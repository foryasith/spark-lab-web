import { Component } from 'react'
import ErrorState from './ErrorState'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Spark Lab ErrorBoundary caught error]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section page-view tech-background">
          <div className="container">
            <ErrorState
              headingLevel="h1"
              title="An unexpected error occurred."
              message="We're sorry for the inconvenience. Please try refreshing or return home."
              onRetry={this.handleReset}
            />
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
