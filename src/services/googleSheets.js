const SHEET_ID_ENV = 'VITE_GOOGLE_SHEET_ID'
const SHEET_TAB_ENV = 'VITE_GOOGLE_SHEET_TAB'
const CATALOG_URL_ENV = 'VITE_GOOGLE_SHEETS_CATALOG_URL'
export const DEFAULT_SHEET_TAB = 'Website Products'

/**
 * Resolves the Google Sheets catalog configuration from environment variables.
 * Supports VITE_GOOGLE_SHEET_ID + VITE_GOOGLE_SHEET_TAB (defaulting to "Website Products"),
 * with backward compatibility for VITE_GOOGLE_SHEETS_CATALOG_URL.
 */
export function getGoogleSheetsCatalogConfig() {
  const sheetId = String(import.meta.env?.[SHEET_ID_ENV] ?? '').trim()
  const sheetTab = String(import.meta.env?.[SHEET_TAB_ENV] ?? DEFAULT_SHEET_TAB).trim() || DEFAULT_SHEET_TAB
  const rawCatalogUrl = String(import.meta.env?.[CATALOG_URL_ENV] ?? '').trim()

  if (rawCatalogUrl) {
    return {
      sheetId: sheetId || null,
      sheetTab,
      url: rawCatalogUrl,
      isConfigured: true,
    }
  }

  if (sheetId) {
    const constructedUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetTab)}`
    return {
      sheetId,
      sheetTab,
      url: constructedUrl,
      isConfigured: true,
    }
  }

  return {
    sheetId: null,
    sheetTab,
    url: '',
    isConfigured: false,
  }
}

export function getGoogleSheetsCatalogUrl() {
  return getGoogleSheetsCatalogConfig().url
}

function rowsToObjects(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return []

  const headers = rows[0].map((header) => String(header ?? '').trim())

  return rows.slice(1).map((row) =>
    headers.reduce((record, header, index) => {
      if (header) record[header] = row[index] ?? ''
      return record
    }, {}),
  )
}

export function parseCsv(csvText) {
  const rows = []
  let row = []
  let field = ''
  let insideQuotes = false
  const input = String(csvText ?? '').replace(/^\uFEFF/, '')

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]

    if (character === '"') {
      if (insideQuotes && input[index + 1] === '"') {
        field += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (character === ',' && !insideQuotes) {
      row.push(field)
      field = ''
    } else if ((character === '\n' || character === '\r') && !insideQuotes) {
      if (character === '\r' && input[index + 1] === '\n') index += 1
      row.push(field)
      if (row.some((value) => String(value).trim())) rows.push(row)
      row = []
      field = ''
    } else {
      field += character
    }
  }

  row.push(field)
  if (row.some((value) => String(value).trim())) rows.push(row)

  return rowsToObjects(rows)
}

export function parseGoogleSheetsPayload(payload) {
  if (Array.isArray(payload)) {
    if (payload.length === 0) return []
    return Array.isArray(payload[0]) ? rowsToObjects(payload) : payload
  }

  if (Array.isArray(payload?.values)) return rowsToObjects(payload.values)
  if (Array.isArray(payload?.products)) return payload.products
  if (Array.isArray(payload?.data)) return payload.data

  throw new Error('The catalog response has an unsupported format.')
}

export async function fetchGoogleSheetRows({
  url = getGoogleSheetsCatalogUrl(),
  signal,
} = {}) {
  if (!url) {
    throw new Error('Google Sheets catalog configuration is missing or incomplete.')
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'text/csv, application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}.`)
  }

  const responseText = await response.text()
  const contentType = response.headers.get('content-type') ?? ''
  const trimmedResponse = responseText.replace(/^\uFEFF/, '').trimStart()
  const appearsToBeJson =
    contentType.includes('json') ||
    trimmedResponse.startsWith('[') ||
    trimmedResponse.startsWith('{')

  if (appearsToBeJson) {
    try {
      return parseGoogleSheetsPayload(JSON.parse(responseText.replace(/^\uFEFF/, '')))
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('The catalog returned invalid JSON.', { cause: error })
      }
      throw error
    }
  }

  return parseCsv(responseText)
}
