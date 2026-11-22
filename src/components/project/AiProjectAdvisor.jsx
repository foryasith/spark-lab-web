import { useEffect, useMemo, useState } from 'react'
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
import {
  clearProjectAdvisorSession,
  loadProjectAdvisorSession,
  saveProjectAdvisorSession,
} from '../../utils/projectAdvisorSession'
import {
  createProjectPlanText,
  downloadProjectPlanText,
  downloadProjectPlanWord,
  printProjectPlanPdf,
} from '../../utils/projectPlanDownload'
import { createAiProjectRequestUrl, createWhatsAppUrl } from '../../utils/whatsapp'
import ErrorState from '../common/ErrorState'
import LoadingState from '../common/LoadingState'
import AiProjectResult from './AiProjectResult'
import CustomProjectIdeaBuilder from './CustomProjectIdeaBuilder'
import RecentProjectRequests from './RecentProjectRequests'

function AiProjectAdvisor() {
  const [savedSession] = useState(loadProjectAdvisorSession)
  const [analysis, setAnalysis] = useState(() => (
    savedSession
      ? { projectData: savedSession.projectData, result: savedSession.result }
      : null
  ))
  const [submittedProject, setSubmittedProject] = useState(() => savedSession?.projectData ?? null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [selectedComponentIds, setSelectedComponentIds] = useState(
    () => new Set(savedSession?.selectedComponentIds ?? []),
  )
  const [cartMessage, setCartMessage] = useState('')
  const [clarificationAnswers, setClarificationAnswers] = useState(
    () => savedSession?.clarificationAnswers ?? {},
  )
  const [recentRequests, setRecentRequests] = useState(loadRecentProjectRequests)
  const { addToCart } = useCart()
  const { products, isLoading: isCatalogLoading } = useCatalog()

  const matchedComponents = useMemo(
    () => (
      analysis?.result && !isCatalogLoading
        ? matchAdvisorComponents(analysis.result, products)
        : []
    ),
    [analysis, isCatalogLoading, products],
  )

  useEffect(() => {
    if (!analysis) {
      clearProjectAdvisorSession()
      return
    }

    saveProjectAdvisorSession({
      projectData: analysis.projectData,
      result: analysis.result,
      selectedComponentIds,
      clarificationAnswers,
    })
  }, [analysis, clarificationAnswers, selectedComponentIds])

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
      setAnalysis({ projectData: projectWithClarifications, result: advisorResult })
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
    ? matchedComponents.filter((component) => selectedComponentIds.has(component.id))
    : []
  const selectedAvailable = selectedComponents.filter((component) => component.product?.in_stock)
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

  const createDownloadPlan = () => {
    if (!analysis) return null

    const catalogSubtotal = selectedAvailable.reduce((total, component) => {
      const price = Number(component.product?.price_lkr)
      const quantity = Math.max(1, Number(component.recommendation?.quantity) || 1)
      return Number.isFinite(price) ? total + price * quantity : total
    }, 0)

    return {
      projectName: analysis.projectData.projectName || 'Spark Lab Project Plan',
      text: createProjectPlanText({
        projectName: analysis.projectData.projectName,
        projectData: analysis.projectData,
        result: analysis.result,
        components: selectedComponents,
        catalogSubtotal,
      }),
    }
  }

  const handleDownload = (format) => {
    const plan = createDownloadPlan()
    if (!plan) return

    if (format === 'pdf') printProjectPlanPdf(plan)
    if (format === 'word') downloadProjectPlanWord(plan)
    if (format === 'text') downloadProjectPlanText(plan)
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
            matchedComponents={matchedComponents}
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
            onDownload={handleDownload}
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
