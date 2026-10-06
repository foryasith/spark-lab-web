import { Route, Routes } from 'react'
import ErrorBoundary from './components/common/ErrorBoundary'
import MainLayout from './components/layout/MainLayout'
import About from './pages/About'
import Cart from './pages/Cart'
import Categories from './pages/Categories'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Learn from './pages/Learn'
import ProductDetails from './pages/ProductDetails'
import ProjectBuilder from './pages/ProjectBuilder'
import ProjectSupport from './pages/ProjectSupport'
import Shop from './pages/Shop'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="categories" element={<Categories />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="project-builder" element={<ProjectBuilder />} />
          <Route path="project-support" element={<ProjectSupport />} />
          <Route path="learn" element={<Learn />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
