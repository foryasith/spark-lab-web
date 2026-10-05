const ignoredWords = new Set([
  'and',
  'board',
  'boards',
  'compatible',
  'component',
  'components',
  'development',
  'generic',
  'kit',
  'module',
  'modules',
  'sensor',
  'sensors',
  'the',
  'with',
])

export function normalizeComponentText(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function getMeaningfulTokens(value) {
  return normalizeComponentText(value)
    .split(' ')
    .filter((token) => token.length >= 2 && !ignoredWords.has(token))
}

function getTokenOverlap(recommendation, product) {
  const recommendationTokens = getMeaningfulTokens(recommendation.name)
  const productTokens = new Set(
    getMeaningfulTokens(`${product.name} ${product.brand} ${product.sku}`),
  )
  const overlappingTokens = recommendationTokens.filter((token) => productTokens.has(token))
  const modelTokens = recommendationTokens.filter((token) => /[a-z].*\d|\d.*[a-z]/.test(token))

  return {
    recommendationTokens,
    overlappingTokens,
    modelMatch: modelTokens.some((token) => productTokens.has(token)),
  }
}

export function matchSuggestedComponent(recommendation, catalogProducts) {
  const activeProducts = catalogProducts.filter((product) => product?.active)
  const normalizedRecommendation = normalizeComponentText(recommendation?.name)

  const exactProduct = activeProducts.find(
    (product) => normalizeComponentText(product.name) === normalizedRecommendation,
  )

  if (exactProduct) {
    return { matchType: 'exact', status: 'Exact Match', product: exactProduct }
  }

  const rankedAlternatives = activeProducts
    .map((product) => {
      const overlap = getTokenOverlap(recommendation, product)
      const categoryMatches =
        normalizeComponentText(product.main_category) ===
        normalizeComponentText(recommendation?.category)
      const overlapRatio = overlap.recommendationTokens.length
        ? overlap.overlappingTokens.length / overlap.recommendationTokens.length
        : 0
      const qualifiesByModel = overlap.modelMatch && overlapRatio >= 0.34
      const qualifiesByCategory =
        categoryMatches &&
        overlap.overlappingTokens.length >= Math.min(2, overlap.recommendationTokens.length)

      return {
        product,
        qualifies: qualifiesByModel || qualifiesByCategory,
        score:
          overlap.overlappingTokens.length * 2 +
          Number(overlap.modelMatch) * 3 +
          Number(categoryMatches),
      }
    })
    .filter((candidate) => candidate.qualifies)
    .sort((first, second) => second.score - first.score)

  if (rankedAlternatives[0]) {
    return {
      matchType: 'alternative',
      status: 'Suggested Alternative',
      product: rankedAlternatives[0].product,
    }
  }

  return { matchType: 'none', status: 'Not Listed', product: null }
}

export function matchAdvisorComponents(advisorResult, catalogProducts) {
  const componentGroups = [
    ['required', advisorResult?.required_components],
    ['optional', advisorResult?.optional_components],
  ]

  return componentGroups.flatMap(([group, components]) =>
    (Array.isArray(components) ? components : []).map((recommendation, index) => ({
      id: `${group}-${index}-${normalizeComponentText(recommendation.name).replaceAll(' ', '-')}`,
      group,
      recommendation,
      ...matchSuggestedComponent(recommendation, catalogProducts),
    })),
  )
}
