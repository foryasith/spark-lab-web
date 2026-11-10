import { normalizeAdvisorResponse } from '../utils/advisorResponse.js'

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
  const projectText = `${projectData.description} ${projectData.expectedFunctionality}`.toLowerCase()
  const hasClarificationAnswers = Object.values(projectData.clarificationAnswers || {}).some(
    (answer) => String(answer).trim(),
  )
  const ideaIsUnclear =
    !hasClarificationAnswers &&
    (projectData.description.trim().length < 50 || projectData.expectedFunctionality.trim().length < 35)
  const requiredSensors = []

  if (/accident|tilt|fall|helmet|movement|vibration/.test(projectText)) {
    requiredSensors.push({
      name: 'Accelerometer and gyroscope module',
      reason: 'Measures sudden movement, impact, tilt, or fall patterns that the controller can evaluate.',
    })
  }
  if (/temperature|humidity|weather|greenhouse/.test(projectText)) {
    requiredSensors.push({
      name: 'Temperature and humidity sensor',
      reason: 'Measures environmental conditions for monitoring or control decisions.',
    })
  }
  if (/distance|obstacle|ultrasonic|tank|water level/.test(projectText)) {
    requiredSensors.push({
      name: 'Distance or level sensor',
      reason: 'Measures distance to an obstacle or liquid level for the main project decision.',
    })
  }
  if (/motion|security|presence/.test(projectText) && requiredSensors.length === 0) {
    requiredSensors.push({
      name: 'Motion sensor',
      reason: 'Detects movement or presence to trigger the project response.',
    })
  }
  if (requiredSensors.length === 0) {
    requiredSensors.push({
      name: 'Primary sensor to confirm',
      reason: 'Choose the sensor based on the exact event or measurement the project must detect.',
    })
  }

  const actuatorsOutputs = /motor|pump|door|robot|wheel/.test(projectText)
    ? [
        {
          name: 'Motor driver and motor output',
          reason: 'Lets the controller safely operate a motor without drawing motor current through the board.',
        },
        {
          name: 'Status LED and buzzer',
          reason: 'Provides simple visual and audible feedback while testing.',
        },
      ]
    : [
        {
          name: 'Status LED and buzzer',
          reason: 'Provides simple visual and audible feedback while testing.',
        },
      ]
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
      projectData.experienceLevel === 'Advanced'
        ? 'Advanced'
        : projectData.experienceLevel === 'Beginner'
          ? 'Beginner'
          : 'Intermediate',
    recommended_platform: recommendedPlatform,
    recommended_controller_reason:
      recommendedPlatform === 'ESP32'
        ? 'ESP32 is a practical choice when the project needs built-in Wi-Fi or Bluetooth alongside general sensor control.'
        : 'Arduino is a beginner-friendly controller for reading sensors, controlling simple outputs, and testing a prototype step by step.',
    required_sensors: requiredSensors,
    actuators_outputs: actuatorsOutputs,
    communication_method:
      requirements.has('Wi-Fi') || requirements.has('Cloud')
        ? 'Wi-Fi can send readings to a dashboard or phone service when a reliable network is available.'
        : requirements.has('Bluetooth')
          ? 'Bluetooth can provide a simple short-range connection to a nearby phone.'
          : 'No wireless connection is required for the first prototype; add one after the core circuit works.',
    power_advice: requirements.has('Battery Powered')
      ? 'Use a battery pack with a suitable regulator, and confirm that its voltage and current capacity safely support the board, sensors, and any motors.'
      : 'Begin with a stable USB power supply, then calculate total current requirements before selecting a permanent power source.',
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
    clarifying_questions: ideaIsUnclear
      ? [
          'What exactly should the project detect or measure?',
          'What should happen after the project detects that event?',
          'Will it be used indoors, outdoors, or in another specific environment?',
        ]
      : [],
    estimated_budget_note:
      'The selected budget is a planning guide only. Final cost depends on compatible catalog products and current availability.',
    next_steps: [
      'Confirm the main input, output and communication requirements.',
      'Review compatible development boards and modules.',
      'Build and test a basic prototype before adding optional features.',
    ],
    system_flow: [
      'Sensor reads the main input or event.',
      `${recommendedPlatform} processes the input using the project rules.`,
      'The output gives feedback or performs the required action.',
      'Optional communication shares useful status information.',
    ],
    beginner_tips: [
      'Test one sensor or output at a time before combining the whole circuit.',
      'Use a breadboard and jumper wires for the first prototype so changes are easy and safe.',
      'Keep a simple wiring diagram and label every power connection before switching on.',
    ],
  }
}

export async function analyzeProject(projectData) {
  try {
    const response = await fetch('/api/project-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    })

    if (!response.ok) {
      throw new Error(`Project advisor request failed with status ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      throw new Error('Project advisor returned an unexpected response type')
    }

    const payload = await response.json()
    return normalizeAdvisorResponse(payload.result)
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.info(
        'Spark Lab Project Advisor: secure endpoint unavailable; using development mock mode.',
      )
      return normalizeAdvisorResponse(createMockProjectAdvice(projectData))
    }

    throw error
  }
}
