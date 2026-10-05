import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadCatalog } from '../services/catalogService'
import CatalogContext from './catalogContext'

function CatalogProvider({ children }) {
  const [catalogState, setCatalogState] = useState({
    products: [],
    source: '',
    warning: '',
    error: null,
    isLoading: true,
  })
  const [loadVersion, setLoadVersion] = useState(0)

  const reload = useCallback(() => {
    setCatalogState((currentState) => ({
      ...currentState,
      error: null,
      isLoading: true,
    }))
    setLoadVersion((currentVersion) => currentVersion + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    loadCatalog({ signal: controller.signal })
      .then((catalog) => {
        setCatalogState({ ...catalog, error: null, isLoading: false })
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return
        setCatalogState({
          products: [],
          source: '',
          warning: '',
          error,
          isLoading: false,
        })
      })

    return () => controller.abort()
  }, [loadVersion])

  const contextValue = useMemo(
    () => ({ ...catalogState, reload }),
    [catalogState, reload],
  )

  return (
    <CatalogContext.Provider value={contextValue}>
      {children}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider
