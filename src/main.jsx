import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CatalogProvider from './context/CatalogProvider.jsx'
import CartProvider from './context/CartProvider.jsx'
import './styles/global.css'
import './styles/backgrounds.css'
import './styles/animations.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CatalogProvider>
    </BrowserRouter>
  </StrictMode>,
)
