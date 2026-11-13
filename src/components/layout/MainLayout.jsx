import { Outlet } from 'react-router-dom'
import FloatingWhatsApp from '../common/FloatingWhatsApp'
import ScrollToTop from '../common/ScrollToTop'
import Footer from './Footer'
import Navbar from './Navbar'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="site-main" tabIndex="-1">
        <Outlet />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  )
}

export default MainLayout
