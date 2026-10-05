import { useEffect, useState } from 'react'
import { Menu, MessageCircle, Search, ShoppingCart, X } from 'lucide-react'
import Logo from '../common/Logo'
import './Navbar.css'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'Project Builder', href: '/project-builder' },
  { label: 'Learn', href: '/learn' },
  { label: 'About', href: '/about' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const renderNavigationLink = ({ label, href }) => (
    <a
      key={href}
      className="nav-link"
      href={href}
      aria-current={currentPath === href ? 'page' : undefined}
      onClick={closeMenu}
    >
      {label}
    </a>
  )

  return (
    <header className="site-header">
      <div className="container navbar">
        <a
          className="navbar-brand"
          href="/"
          aria-label="Spark Lab home"
          onClick={closeMenu}
        >
          <Logo size="small" />
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigationItems.map(renderNavigationLink)}
        </nav>

        <div className="navbar-actions">
          <a className="navbar-icon-link" href="/shop" aria-label="Search products">
            <Search aria-hidden="true" size={20} strokeWidth={1.8} />
          </a>
          <a className="navbar-icon-link" href="/cart" aria-label="View cart">
            <ShoppingCart aria-hidden="true" size={20} strokeWidth={1.8} />
          </a>
          <a className="btn btn-primary navbar-cta" href="/contact">
            <MessageCircle aria-hidden="true" size={18} />
            Contact Us
          </a>
          <button
            className="navbar-menu-button"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={24} />
            ) : (
              <Menu aria-hidden="true" size={24} />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-navigation${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="container mobile-navigation-inner">
          {navigationItems.map(renderNavigationLink)}
          <a className="mobile-contact-link" href="/contact" onClick={closeMenu}>
            <MessageCircle aria-hidden="true" size={18} />
            Contact Us
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
