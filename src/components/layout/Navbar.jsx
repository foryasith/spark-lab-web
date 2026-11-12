import { useEffect, useState } from 'react'
import {
  Menu,
  MessageCircle,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import Logo from '../common/Logo'
import './Navbar.css'

const navigationItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Shop',
    href: '/shop',
  },
  {
    label: 'Categories',
    href: '/categories',
  },
  {
    label: 'Project Builder',
    href: '/project-builder',
    special: true,
    badge: 'AI',
  },
  {
    label: 'Learn',
    href: '/learn',
  },
  {
    label: 'About',
    href: '/about',
  },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const renderNavigationLink = ({
    label,
    href,
    special,
    badge,
  }) => (
    <NavLink
      key={href}
      to={href}
      end={href === '/'}
      onClick={closeMenu}
      className={({ isActive }) =>
        [
          'nav-link',
          special ? 'nav-link--special' : '',
          isActive ? 'is-active' : '',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      <span>{label}</span>

      {badge && (
        <span
          className="nav-special-badge"
        >
          {badge}
        </span>
      )}
    </NavLink>
  )

  return (
    <header className="site-header">
      <div className="container navbar">
        {/* Brand */}
        <Link
          className="navbar-brand"
          to="/"
          aria-label="Spark Lab home"
          onClick={closeMenu}
        >
          <Logo size="small" />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="desktop-navigation"
          aria-label="Primary navigation"
        >
          {navigationItems.map(renderNavigationLink)}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <Link
            className="navbar-icon-link"
            to="/shop"
            aria-label="Search products"
          >
            <Search
              aria-hidden="true"
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          <Link
            className="navbar-icon-link navbar-cart-link"
            to="/cart"
            aria-label={`View cart with ${cartCount} items`}
          >
            <ShoppingCart
              aria-hidden="true"
              size={20}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span className="navbar-cart-badge">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <Link
            className="btn btn-primary navbar-cta"
            to="/contact"
          >
            <MessageCircle
              aria-hidden="true"
              size={18}
            />

            Contact Us
          </Link>

          <button
            className="navbar-menu-button"
            type="button"
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setIsMenuOpen((isOpen) => !isOpen)
            }
          >
            {isMenuOpen ? (
              <X
                aria-hidden="true"
                size={24}
              />
            ) : (
              <Menu
                aria-hidden="true"
                size={24}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav
        id="mobile-navigation"
        className={`mobile-navigation${
          isMenuOpen ? ' is-open' : ''
        }`}
        aria-label="Mobile navigation"
      >
        <div className="container mobile-navigation-inner">
          {navigationItems.map(renderNavigationLink)}

          <Link
            className="mobile-contact-link"
            to="/contact"
            onClick={closeMenu}
          >
            <MessageCircle
              aria-hidden="true"
              size={18}
            />

            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
