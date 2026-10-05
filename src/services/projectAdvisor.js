function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function createSuggestedComponents(projectData, platform) {
  const requirements = new Set(projectData.requirements)
  const components = [
    {
      name: `${platform} development board`,
      category: 'Development Boards',
      quantity: 1,
      reason: 'Provides the main processing and control for the project.',
      catalog_status: 'needs-confirmation',
    },
    {
      name: 'Breadboard and jumper wires',
      category: 'Prototyping',
      quantity: 1,
      reason: 'Supports safe early-stage circuit prototyping and testing.',
      catalog_status: 'needs-confirmation',
    },
  ]

  const requirementComponents = {
    GPS: ['GPS module', 'Communication Modules', 'Provides location coordinates.'],
    Camera: ['Camera module', 'Modules', 'Captures images or video for the project.'],
    Display: ['Display module', 'Modules', 'Shows project status and readings locally.'],
    'Motor Control': ['Motor driver module', 'Modules', 'Controls motors without overloading the development board.'],
    'Battery Powered': ['Battery pack and regulator', 'Power', 'Provides suitable portable and regulated power.'],
    Bluetooth: ['Bluetooth communication module', 'Communication Modules', 'Adds short-range wireless communication when not built into the board.'],
  }

  Object.entries(requirementComponents).forEach(([requirement, details]) => {
    if (!requirements.has(requirement)) return
    components.push({
      name: details[0],
      category: details[1],
      quantity: 1,
      reason: details[2],
      catalog_status: 'needs-confirmation',
    })
  })

  return components
}

export function createMockProjectAdvice(projectData) {
  const requirements = new Set(projectData.requirements)
  const recommendedPlatform =
    projectData.preferredPlatform !== 'No Preference' &&
    projectData.preferredPlatform !== 'Other / Not Sure'
      ? projectData.preferredPlatform
      : requirements.has('Wi-Fi') || requirements.has('Cloud') || requirements.has('Bluetooth')
        ? 'ESP32'
        : 'Arduino'

  return {
    project_summary: `${projectData.projectName || 'This project'} aims to ${projectData.expectedFunctionality.toLowerCase()} based on the idea described by the builder.`,
    recommended_approach:
      'Start with a small proof of concept: validate the main input, process it on one development board, then add communication, output and power features in separate tested stages.',
    difficulty:
      projectData.experienceLevel === 'Advanced' ? 'Advanced' : 'Intermediate',
    recommended_platform: recommendedPlatform,
    required_components: createSuggestedComponents(projectData, recommendedPlatform),
    optional_components: [
      {
        name: 'Status LED and buzzer',
        category: 'Electronic Components',
        quantity: 1,
        reason: 'Provides simple visual and audible feedback while testing.',
        catalog_status: 'needs-confirmation',
      },
    ],
    technical_considerations: [
      'Confirm voltage compatibility before connecting modules.',
      'Test each sensor or communication feature independently before combining the circuit.',
      requirements.has('Battery Powered')
        ? 'Estimate current consumption before selecting the battery and regulator.'
        : 'Plan a stable power source with enough current for every connected component.',
    ],
    clarifying_questions: [
      'What environment will the project operate in?',
      'How quickly must the project detect and respond to an event?',
      'Does the project need to work when internet access is unavailable?',
    ],
    estimated_budget_note:
      'The selected budget is a planning guide only. Final cost depends on compatible catalog products and current availability.',
    next_steps: [
      'Confirm the main input, output and communication requirements.',
      'Review compatible development boards and modules.',
      'Build and test a basic prototype before adding optional features.',
    ],
  }
}

export async function analyzeProject(projectData) {
  await wait(650)
  return createMockProjectAdvice(projectData)
}
