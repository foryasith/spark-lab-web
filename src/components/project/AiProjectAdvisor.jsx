import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import useCatalog from '../../hooks/useCatalog'
import useCart from '../../hooks/useCart'
import { analyzeProject } from '../../services/projectAdvisor'
import analytics from '../../utils/analytics'
import { matchAdvisorComponents } from '../../utils/componentMatching'
import {
  addRecentProjectRequest,
  clearRecentProjectRequests,
  loadRecentProjectRequests,
} from '../../utils/projectStorage'
import { createAiProjectRequestUrl, createWhatsAppUrl } from '../../utils/whatsapp'
import ErrorState from '../common/ErrorState'
import LoadingState from '../common/LoadingState'
import AiProjectResult from './AiProjectResult'
import CustomProjectIdeaBuilder from './CustomProjectIdeaBuilder'
import RecentProjectRequests from './RecentProjectRequests'

function AiProjectAdvisor() {
  const [analysis, setAnalysis] = useState(null)
  const [submittedProject, setSubmittedProject] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [selectedComponentIds, setSelectedComponentIds] = useState(new Set())
  const [cartMessage, setCartMessage] = useState('')
  const [clarificationAnswers, setClarificationAnswers] = useState({})
  const [recentRequests, setRecentRequests] = useState(loadRecentProjectRequests)
  const { addToCart } = useCart()
  const { products, isLoading: isCatalogLoading } = useCatalog()

  const handleAnalyze = async (projectData) => {
    if (isAnalyzing) return
    if (isCatalogLoading) {
      setError('The component catalog is still loading. Please try again in a moment.')
      return
    }

    const projectWithClarifications = {
      ...projectData,
      clarificationAnswers: projectData.clarificationAnswers || {},
    }
    setSubmittedProject(projectWithClarifications)
    setIsAnalyzing(true)
    setError('')
    analytics.trackProjectAiAnalysis(projectWithClarifications.requestType || 'custom')

    try {
      const advisorResult = await analyzeProject(projectWithClarifications)
      const matchedComponents = matchAdvisorComponents(advisorResult, products)
      setAnalysis({ projectData: projectWithClarifications, result: advisorResult, matchedComponents })
      setClarificationAnswers(projectWithClarifications.clarificationAnswers)
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

  const handleClarificationAnswerChange = (question, answer) => {
    setClarificationAnswers((currentAnswers) => ({ ...currentAnswers, [question]: answer }))
  }

  const handleRefinePlan = () => {
    if (!analysis || isAnalyzing) return
    handleAnalyze({ ...analysis.projectData, clarificationAnswers })
  }

  const handleEditProject = () => {
    setAnalysis(null)
    setError('')
    setCartMessage('')
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
        clarificationAnswers,
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

  const handleSendFullRequest = () => {
    if (!analysis) return

    const request = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      projectName: analysis.projectData.projectName || 'Custom project idea',
      createdAt: new Date().toISOString(),
      summary: analysis.result.project_summary,
    }
    setRecentRequests(addRecentProjectRequest(request))
  }

  const handleClearRecentRequests = () => {
    clearRecentProjectRequests()
    setRecentRequests([])
  }

  return (
    <div className="ai-project-advisor">
      <CustomProjectIdeaBuilder
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        hasAnalysis={Boolean(analysis)}
        onEditProject={handleEditProject}
      >
        {isAnalyzing ? (
          <LoadingState message="Analyzing your project idea..." />
        ) : error ? (
          <ErrorState
            title="AI Project Advisor is temporarily unavailable."
            message="You can still send your project idea directly to Spark Lab."
            onRetry={submittedProject ? retryAnalysis : undefined}
            action={
              <a
                className="btn btn-primary"
                href={
                  submittedProject
                    ? createAiProjectRequestUrl({ projectData: submittedProject, selectedComponents: [] })
                    : createWhatsAppUrl('Hello Spark Lab, I have a project idea I would like help with.')
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" size={16} />
                Send Project Request on WhatsApp
              </a>
            }
          />
        ) : analysis ? (
          <AiProjectResult
            result={analysis.result}
            matchedComponents={analysis.matchedComponents}
            selectedComponentIds={selectedComponentIds}
            onToggleComponent={toggleComponent}
            onAddAvailableParts={handleAddAvailableParts}
            onSendFullRequest={handleSendFullRequest}
            clarificationAnswers={clarificationAnswers}
            onClarificationAnswerChange={handleClarificationAnswerChange}
            onRefinePlan={handleRefinePlan}
            isRefining={isAnalyzing}
            projectName={analysis.projectData.projectName}
            cartMessage={cartMessage}
            missingRequestUrl={createAiProjectRequestUrl({ ...requestData, requestType: 'missing' })}
            fullRequestUrl={createAiProjectRequestUrl(requestData)}
          />
        ) : null}
      </CustomProjectIdeaBuilder>
      <RecentProjectRequests
        requests={recentRequests}
        onClear={handleClearRecentRequests}
      />
    </div>
  )
}

export default AiProjectAdvisor
