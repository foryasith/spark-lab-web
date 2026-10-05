import {
  Bot,
  Boxes,
  Cpu,
  GraduationCap,
  Radio,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './Hero.css'

const trustItems = [
  { label: 'Islandwide Delivery', Icon: Truck },
  { label: 'Student Friendly', Icon: GraduationCap },
  { label: 'Quality Components', Icon: ShieldCheck },
]

const makerCategories = [
  { name: 'Arduino', label: 'Build', Icon: Cpu },
  { name: 'ESP32', label: 'Connect', Icon: Radio },
  { name: 'Sensors', label: 'Measure', Icon: Boxes },
  { name: 'Robotics', label: 'Move', Icon: Bot },
  { name: 'DIY Kits', label: 'Create', Icon: Wrench },
]

function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="container hero-layout">
        <div className="hero-content">
          <p className="hero-eyebrow">IoT • Robotics • Maker Solutions</p>
          <h1 id="home-hero-title" className="hero-title">
            Turn Your Ideas
            <span className="hero-title-accent">Into Real Projects.</span>
          </h1>
          <p className="hero-description">
            Find electronics, IoT components, robotics parts and maker tools for
            your next build — made for students, makers and innovators.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/shop">
              Shop Components
            </Link>
            <Link className="btn btn-outline" to="/project-builder">
              Explore Projects
            </Link>
          </div>

          <ul className="hero-trust-list" aria-label="Why shop with Spark Lab">
            {trustItems.map(({ label, Icon }) => (
              <li key={label}>
                <span className="hero-trust-icon">
                  <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" aria-label="Spark Lab maker categories">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="maker-panel">
            <div className="maker-panel-header">
              <div>
                <span className="maker-status-dot" aria-hidden="true" />
                <span>Maker Toolkit</span>
              </div>
              <span className="maker-panel-code">SL / 01</span>
            </div>

            <div className="maker-category-grid">
              {makerCategories.map(({ name, label, Icon }, index) => (
                <article
                  key={name}
                  className={`maker-category-card${index === 0 ? ' is-featured' : ''}`}
                >
                  <span className="maker-category-icon">
                    <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
                  </span>
                  <span>
                    <strong>{name}</strong>
                    <small>{label}</small>
                  </span>
                </article>
              ))}
            </div>

            <div className="maker-panel-footer">
              <span>Build ready</span>
              <span>5 core categories</span>
            </div>
          </div>
          <span className="hero-visual-label hero-visual-label-top">IoT / 02</span>
          <span className="hero-visual-label hero-visual-label-bottom">
            TEST • ITERATE • CREATE
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
