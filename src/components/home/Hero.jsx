import { GraduationCap, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import makerHeroImage from '../../assets/images/spark-lab-maker-hero.png'
import obstacleRobotImage from '../../assets/images/spark-lab-obstacle-robot.png'
import './Hero.css'

const trustItems = [
  { label: 'Islandwide Delivery', Icon: Truck },
  { label: 'Student Friendly', Icon: GraduationCap },
  { label: 'Quality Components', Icon: ShieldCheck },
]

function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="container hero-layout">
        <div className="hero-content">
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

        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-image-glow" aria-hidden="true" />
          <div
            className="hero-image-wrap hero-component-assembly"
            role="img"
            aria-label="Electronics components assembling into a finished obstacle-avoiding robot"
          >
            <img
              className="hero-product-image hero-assembly-part hero-assembly-sensor"
              src={makerHeroImage}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-product-image hero-assembly-part hero-assembly-board"
              src={makerHeroImage}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-product-image hero-assembly-part hero-assembly-servo"
              src={makerHeroImage}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-product-image hero-assembly-part hero-assembly-chassis"
              src={makerHeroImage}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-product-image hero-assembly-part hero-assembly-connectors"
              src={makerHeroImage}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-product-image hero-final-robot"
              src={obstacleRobotImage}
              alt=""
              aria-hidden="true"
            />
          </div>
          <span className="hero-circuit-node hero-circuit-node-top" aria-hidden="true" />
          <span className="hero-circuit-node hero-circuit-node-bottom" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default Hero
