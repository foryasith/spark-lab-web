import {
  Camera,
  MapPin,
  MessageCircle,
  Music2,
  ThumbsUp,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import business from '../../config/business'
import Logo from '../common/Logo'
import './Footer.css'

const shopLinks = [
  'Development Boards',
  'Sensors',
  'Modules',
  'Robotics',
  'Electronic Components',
  'Tools',
]

const quickLinks = [
  { label: 'Project Builder', href: '/project-builder' },
  { label: 'Project Support', href: '/project-support' },
  { label: 'Learn', href: '/learn' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const socialPlatforms = [
  { label: 'Facebook', Icon: ThumbsUp },
  { label: 'Instagram', Icon: Camera },
  { label: 'TikTok', Icon: Music2 },
  { label: 'WhatsApp', Icon: MessageCircle },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <section className="footer-brand" aria-label="About Spark Lab">
            <Link className="footer-brand-link" to="/" aria-label="Spark Lab home">
              <Logo className="footer-logo" size="medium" />
            </Link>
            <p className="footer-tagline">Build. Test. Innovate.</p>
            <p className="footer-description">
              Electronics, IoT, robotics and maker solutions for students,
              makers and innovators.
            </p>
          </section>

          <nav className="footer-column" aria-labelledby="footer-shop-title">
            <h2 id="footer-shop-title" className="footer-heading">
              Shop
            </h2>
            <ul className="footer-links">
              {shopLinks.map((link) => (
                <li key={link}>
                  <Link to="/categories">{link}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-labelledby="footer-links-title">
            <h2 id="footer-links-title" className="footer-heading">
              Quick Links
            </h2>
            <ul className="footer-links">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-column" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className="footer-heading">
              Contact
            </h2>
            <ul className="footer-contact-list">
              <li>
                <MessageCircle aria-hidden="true" size={18} />
                <span>
                  WhatsApp
                  <a href={`tel:${business.phoneInternational}`}>
                    {business.phoneDisplay}
                  </a>
                </span>
              </li>
              <li>
                <Truck aria-hidden="true" size={18} />
                <span>Islandwide Delivery</span>
              </li>
              <li>
                <MapPin aria-hidden="true" size={18} />
                <span>{business.location}</span>
              </li>
            </ul>

            <div className="footer-socials" aria-label="Social media placeholders">
              {socialPlatforms.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="footer-social-placeholder"
                  role="img"
                  aria-label={label}
                  title={label}
                >
                  <Icon aria-hidden="true" size={18} />
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Spark Lab. All rights reserved.</p>
          <p className="footer-developer-credit">
            Built by{' '}
            <a
              href="https://github.com/Rashini0926"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rashini0926
            </a>
          </p>
          <p>IoT | Robotics | Maker Solutions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
