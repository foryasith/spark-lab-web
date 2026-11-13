import { Boxes, CircleArrowRight, Headphones, Lightbulb, Sparkles, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import useSeo from '../hooks/useSeo'
import './About.css'

const quickLinks = [
  {
    title: 'Shop Components',
    description: 'Boards, sensors, modules and maker essentials.',
    to: '/shop',
    Icon: Boxes,
  },
  {
    title: 'Explore Categories',
    description: 'Find the right part for your next build.',
    to: '/categories',
    Icon: Wrench,
  },
  {
    title: 'Project Builder',
    description: 'Plan a project and get component guidance.',
    to: '/project-builder',
    Icon: Lightbulb,
  },
  {
    title: 'Project Support',
    description: 'Talk to Spark Lab about your project idea.',
    to: '/project-support',
    Icon: Headphones,
  },
]

function About() {
  useSeo({
    title: 'About Spark Lab | Build. Test. Innovate.',
    description: 'Spark Lab helps students, makers and innovators build practical electronics, IoT and robotics projects.',
  })

  return (
    <div className="about-page tech-background">
      <section className="about-hero section">
        <div className="container about-hero-layout">
          <div>
            <span className="about-eyebrow">About Spark Lab</span>
            <h1>Build better ideas, one project at a time.</h1>
            <p>
              Spark Lab brings together electronics, IoT, robotics and practical
              guidance for students, makers and innovators in Sri Lanka.
            </p>
            <div className="about-hero-actions">
              <Link className="btn btn-secondary" to="/shop">Shop Components</Link>
              <Link className="btn btn-outline" to="/project-builder">Start a Project</Link>
            </div>
          </div>
          <div className="about-brand-mark" aria-hidden="true">
            <Sparkles size={30} strokeWidth={1.5} />
            <strong>Build. Test. Innovate.</strong>
            <span>IoT · Robotics · Maker Solutions</span>
          </div>
        </div>
      </section>

      <section className="about-quick-section section" aria-labelledby="about-quick-title">
        <div className="container">
          <header className="about-section-heading">
            <span className="about-eyebrow">Quick Access</span>
            <h2 id="about-quick-title">What would you like to do?</h2>
          </header>
          <div className="about-quick-grid">
            {quickLinks.map(({ title, description, to, Icon }) => (
              <Link className="about-quick-card" to={to} key={title}>
                <span className="about-quick-icon"><Icon aria-hidden="true" size={22} strokeWidth={1.6} /></span>
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <CircleArrowRight aria-hidden="true" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
