import { Outlet } from 'react-router-dom'
import FloatingWhatsApp from '../common/FloatingWhatsApp'
import Footer from './Footer'
import Navbar from './Navbar'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  )
}

export default MainLayout
