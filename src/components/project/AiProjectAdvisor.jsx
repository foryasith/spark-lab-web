import { useState } from 'react'
import { analyzeProject } from '../../services/projectAdvisor'
import ErrorState from '../common/ErrorState'
import LoadingState from '../common/LoadingState'
import AiProjectResult from './AiProjectResult'
import CustomProjectIdeaBuilder from './CustomProjectIdeaBuilder'

function AiProjectAdvisor() {
  const [result, setResult] = useState(null)
  const [submittedProject, setSubmittedProject] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async (projectData) => {
    if (isAnalyzing) return

    setSubmittedProject(projectData)
    setIsAnalyzing(true)
    setError('')

    try {
      const advisorResult = await analyzeProject(projectData)
      setResult(advisorResult)
    } catch {
      setError('The project advisor could not analyze this idea right now.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const retryAnalysis = () => {
    if (submittedProject) handleAnalyze(submittedProject)
  }

  return (
    <CustomProjectIdeaBuilder onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing}>
      {isAnalyzing ? (
        <LoadingState message="Analyzing your project idea..." />
      ) : error ? (
        <ErrorState message={error} onRetry={submittedProject ? retryAnalysis : undefined} />
      ) : result ? (
        <AiProjectResult result={result} />
      ) : null}
    </CustomProjectIdeaBuilder>
  )
}

export default AiProjectAdvisor
