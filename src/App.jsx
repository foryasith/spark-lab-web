import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoadingState from './components/common/LoadingState'
import MainLayout from './components/layout/MainLayout'

const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const Categories = lazy(() => import('./pages/Categories'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const ProjectBuilder = lazy(() => import('./pages/ProjectBuilder'))
const ProjectSupport = lazy(() => import('./pages/ProjectSupport'))
const SmartSpark = lazy(() => import('./pages/SmartSpark'))
const Learn = lazy(() => import('./pages/Learn'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="section tech-background page-view">
            <div className="container">
              <LoadingState message="Loading Spark Lab..." />
            </div>
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path="shop" element={<Shop />} />

            <Route path="categories" element={<Categories />} />

            <Route
              path="product/:slug"
              element={<ProductDetails />}
            />

            <Route
              path="project-builder"
              element={<ProjectBuilder />}
            />

            <Route
              path="project-support"
              element={<ProjectSupport />}
            />

            <Route
              path="smartspark"
              element={<SmartSpark />}
            />

            <Route path="learn" element={<Learn />} />

            <Route path="about" element={<About />} />

            <Route path="contact" element={<Contact />} />

            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App