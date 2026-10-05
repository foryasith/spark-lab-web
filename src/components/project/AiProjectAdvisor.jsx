import { useState } from 'react'
import { products } from '../../data/products'
import { analyzeProject } from '../../services/projectAdvisor'
import { matchAdvisorComponents } from '../../utils/componentMatching'
import { createAiProjectRequestUrl } from '../../utils/whatsapp'
import useCart from '../../hooks/useCart'
import ErrorState from '../common/ErrorState'
import LoadingState from '../common/LoadingState'
import AiProjectResult from './AiProjectResult'
import CustomProjectIdeaBuilder from './CustomProjectIdeaBuilder'

function AiProjectAdvisor() {
  const [analysis, setAnalysis] = useState(null)
  const [submittedProject, setSubmittedProject] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [selectedComponentIds, setSelectedComponentIds] = useState(new Set())
  const [cartMessage, setCartMessage] = useState('')
  const { addToCart } = useCart()

  const handleAnalyze = async (projectData) => {
    if (isAnalyzing) return

    setSubmittedProject(projectData)
    setIsAnalyzing(true)
    setError('')

    try {
      const advisorResult = await analyzeProject(projectData)
      const matchedComponents = matchAdvisorComponents(advisorResult, products)
      setAnalysis({ projectData, result: advisorResult, matchedComponents })
      setSelectedComponentIds(new Set(matchedComponents.map((component) => component.id)))
      setCartMessage('')
    } catch {
      setError('The project advisor could not analyze this idea right now.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const retryAnalysis = () => {
    if (submittedProject) handleAnalyze(submittedProject)
  }

  const toggleComponent = (componentId) => {
    setSelectedComponentIds((currentIds) => {
      const nextIds = new Set(currentIds)
      if (nextIds.has(componentId)) nextIds.delete(componentId)
      else nextIds.add(componentId)
      return nextIds
    })
    setCartMessage('')
  }

  const selectedComponents = analysis
    ? analysis.matchedComponents.filter((component) => selectedComponentIds.has(component.id))
    : []
  const requestData = analysis
    ? {
        projectData: analysis.projectData,
        advisorResult: analysis.result,
        selectedComponents,
      }
    : null

  const handleAddAvailableParts = () => {
    const availableComponents = selectedComponents.filter(
      (component) => component.product?.in_stock,
    )
    availableComponents.forEach((component) => {
      addToCart(component.product, component.recommendation.quantity)
    })
    setCartMessage(
      `${availableComponents.length} available ${availableComponents.length === 1 ? 'part' : 'parts'} added to your cart.`,
    )
  }

  return (
    <CustomProjectIdeaBuilder onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing}>
      {isAnalyzing ? (
        <LoadingState message="Analyzing your project idea..." />
      ) : error ? (
        <ErrorState message={error} onRetry={submittedProject ? retryAnalysis : undefined} />
      ) : analysis ? (
        <AiProjectResult
          result={analysis.result}
          matchedComponents={analysis.matchedComponents}
          selectedComponentIds={selectedComponentIds}
          onToggleComponent={toggleComponent}
          onAddAvailableParts={handleAddAvailableParts}
          cartMessage={cartMessage}
          missingRequestUrl={createAiProjectRequestUrl({ ...requestData, requestType: 'missing' })}
          fullRequestUrl={createAiProjectRequestUrl(requestData)}
        />
      ) : null}
    </CustomProjectIdeaBuilder>
  )
}

export default AiProjectAdvisor
