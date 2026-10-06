import {
  BookOpen,
  Bot,
  Boxes,
  FlaskConical,
  GraduationCap,
  Hammer,
  Headphones,
  Lightbulb,
  MapPin,
  PackageSearch,
  Radio,
  Rocket,
  Truck,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import useSeo from '../hooks/useSeo'
import './About.css'

const brandPillars = [
  {
    title: 'Learn',
    description: 'Understand the technology.',
    detail: 'Build confidence with approachable resources and practical explanations.',
    Icon: BookOpen,
  },
  {
    title: 'Build',
    description: 'Find the components you need.',
    detail: 'Bring boards, sensors, modules and mechanical parts together around an idea.',
    Icon: Hammer,
  },
  {
    title: 'Test',
    description: 'Experiment, troubleshoot and improve.',
    detail: 'Learn from each prototype and make thoughtful changes to the next version.',
    Icon: FlaskConical,
  },
  {
    title: 'Innovate',
    description: 'Turn ideas into practical solutions.',
    detail: 'Use technology creatively to solve real problems and explore new possibilities.',
    Icon: Lightbulb,
  },
]

const supportedMakers = [
  ['Students', GraduationCap],
  ['Makers', Wrench],
  ['IoT Developers', Radio],
  ['Robotics Builders', Bot],
  ['DIY Hobbyists', Boxes],
  ['Innovators', Rocket],
]

const offerings = [
  'Electronics Components',
  'IoT Parts',
  'Development Boards',
  'Sensors & Modules',
  'Robotics Parts',
  'DIY Kits',
  'Project Builder',
  'Student Project Support',
  'Learning Resources',
]

const reasons = [
  {
    title: 'Student Friendly',
    description: 'An approachable experience for first builds and growing skills.',
    Icon: GraduationCap,
  },
  {
    title: 'Practical Support',
    description: 'Guidance focused on components, planning and useful next steps.',
    Icon: Headphones,
  },
  {
    title: 'Maker Focused',
    description: 'Products and resources shaped around electronics and project building.',
    Icon: Wrench,
  },
  {
    title: 'Islandwide Delivery',
    description: 'Online ordering support for makers across Sri Lanka.',
    Icon: Truck,
  },
  {
    title: 'Growing Component Range',
    description: 'A developing catalog designed around useful maker essentials.',
    Icon: PackageSearch,
  },
]

function About() {
  useSeo({
    title: 'About Spark Lab | Build. Test. Innovate.',
    description:
      'Discover Spark Lab Sri Lanka — your trusted partner for high-quality electronics, IoT, robotics components and student maker support.',
  })
  return (
    <div className="about-page">
      <section className="about-hero tech-background section">
        <div className="container about-hero-layout">
          <div>
            <span className="about-eyebrow">About Spark Lab</span>
            <h1>Helping Ideas Become Real Projects.</h1>
            <p>
              Spark Lab is built for students, makers and innovators who want
              easier access to electronics, IoT, robotics and maker components.
            </p>
          </div>
          <div className="about-hero-mark" aria-hidden="true">
            <span>Ideas</span>
            <i />
            <span>Components</span>
            <i />
            <span>Creations</span>
          </div>
        </div>
      </section>

      <section className="about-mission section" aria-labelledby="about-mission-title">
        <div className="container about-mission-layout">
          <div className="about-mission-icon" aria-hidden="true">
            <MapPin size={32} strokeWidth={1.5} />
          </div>
          <div>
            <span className="about-eyebrow">Our Mission</span>
            <h2 id="about-mission-title">Maker Technology Made More Approachable</h2>
            <p>
              Our mission is to make electronics and maker technology more
              accessible, practical and approachable for students and builders in
              Sri Lanka. We want each component to feel like the start of a useful
              experiment—not just another item on a shelf.
            </p>
          </div>
        </div>
      </section>

      <section className="about-pillars section" aria-labelledby="brand-pillars-title">
        <div className="container">
          <header className="about-section-heading">
            <span className="about-eyebrow">The Maker Journey</span>
            <h2 id="brand-pillars-title">Learn. Build. Test. Innovate.</h2>
            <p>Four connected steps that shape how Spark Lab supports every idea.</p>
          </header>
          <div className="about-pillar-grid">
            {brandPillars.map(({ title, description, detail, Icon }, index) => (
              <article className="about-pillar-card" key={title}>
                <span className="about-pillar-number">0{index + 1}</span>
                <Icon aria-hidden="true" size={27} strokeWidth={1.6} />
                <h3>{title}</h3>
                <strong>{description}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-community section" aria-labelledby="community-title">
        <div className="container about-community-layout">
          <div>
            <span className="about-eyebrow">Who We Support</span>
            <h2 id="community-title">A Place for Curious Builders</h2>
            <p>
              Whether you are learning your first circuit or developing a connected
              prototype, Spark Lab is designed to help you keep moving forward.
            </p>
          </div>
          <ul>
            {supportedMakers.map(([label, Icon]) => (
              <li key={label}>
                <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-offers section" aria-labelledby="offers-title">
        <div className="container about-offers-layout">
          <div className="about-section-heading">
            <span className="about-eyebrow">What Spark Lab Offers</span>
            <h2 id="offers-title">Parts, Tools and Practical Support</h2>
            <p>
              A focused maker ecosystem that connects useful components with ideas,
              learning and project assistance.
            </p>
          </div>
          <ul>
            {offerings.map((offering) => (
              <li key={offering}>{offering}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-why section" aria-labelledby="why-spark-lab-title">
        <div className="container">
          <header className="about-section-heading">
            <span className="about-eyebrow">Why Spark Lab</span>
            <h2 id="why-spark-lab-title">Built Around the Way Makers Work</h2>
          </header>
          <div className="about-reason-grid">
            {reasons.map(({ title, description, Icon }) => (
              <article key={title}>
                <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta section">
        <div className="container">
          <div>
            <span>Build. Test. Innovate.</span>
            <h2>Ready to Start Building?</h2>
            <p>Find the right components or begin with a practical project idea.</p>
          </div>
          <div className="about-cta-actions">
            <Link className="btn btn-secondary" to="/shop">Shop Components</Link>
            <Link className="btn about-cta-outline" to="/project-builder">Explore Projects</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
