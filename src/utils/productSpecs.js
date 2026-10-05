function formatSpecLabel(label) {
  return String(label)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function normalizeSpecItem(item) {
  if (typeof item === 'string' || typeof item === 'number') {
    return [{ label: '', value: String(item) }]
  }

  if (item && typeof item === 'object') {
    if ('value' in item) {
      if (item.value === null || item.value === undefined || item.value === '') return []

      return [{ label: item.label ? String(item.label) : '', value: String(item.value) }]
    }

    return Object.entries(item)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([label, value]) => ({
        label: formatSpecLabel(label),
        value: String(value),
      }))
  }

  return []
}

export function normalizeProductSpecs(specs) {
  if (!specs) return []

  if (Array.isArray(specs)) return specs.flatMap(normalizeSpecItem)

  if (typeof specs === 'string') {
    return specs
      .split(/\r?\n|\|/)
      .map((spec) => spec.trim())
      .filter(Boolean)
      .flatMap(normalizeSpecItem)
  }

  return normalizeSpecItem(specs)
}
