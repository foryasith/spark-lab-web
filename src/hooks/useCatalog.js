import { useContext } from 'react'
import CatalogContext from '../context/catalogContext'

function useCatalog() {
  const catalog = useContext(CatalogContext)

  if (!catalog) {
    throw new Error('useCatalog must be used within CatalogProvider')
  }

  return catalog
}

export default useCatalog
