import { ArrowRight, Cpu, Sparkles, ShieldCheck, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import './SmartSpark.css'

function SmartSpark() {
  return (
    <main className="smartspark-page">
      {/* HERO */}
      <section className="smartspark-hero">
        <div className="container smartspark-hero__inner">
          <div className="smartspark-hero__content">
            <span className="smartspark-badge">
              <Sparkles size={16} />
              A Spark Lab Product
            </span>

            <h1>
              Meet <span>SmartSpark</span>
            </h1>

            <p className="smartspark-hero__lead">
              A Spark Lab product created to make technology more practical,
              accessible and useful for students, makers and innovators.
            </p>

            <p className="smartspark-hero__note">
              Product details, specifications and availability will be updated
              as SmartSpark development progresses.
            </p>

            <div className="smartspark-actions">
              <Link to="/contact" className="btn btn-primary">
                Ask About SmartSpark
                <ArrowRight size={18} />
              </Link>

              <Link to="/project-builder" className="btn btn-outline">
                Explore Project Builder
              </Link>
            </div>
          </div>

          <div className="smartspark-product-preview">
            <div className="smartspark-orbit" />

            <div className="smartspark-preview-card">
              <div className="smartspark-preview-icon">
                <Cpu size={42} />
              </div>

              <span>SPARK LAB PRODUCT</span>
              <h2>SmartSpark</h2>

              <p>
                Build. Test. Innovate.
              </p>

              <div className="smartspark-preview-status">
                Product Development
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section smartspark-intro">
        <div className="container">
          <div className="smartspark-section-heading">
            <span>SMARTSPARK</span>
            <h2>Built Around Real Ideas</h2>
            <p>
              SmartSpark is part of our goal to move beyond selling components
              and create practical technology products under the Spark Lab brand.
            </p>
          </div>

          <div className="smartspark-feature-grid">
            <article className="smartspark-feature-card">
              <div className="smartspark-feature-icon">
                <Cpu size={24} />
              </div>
              <h3>Technology Focused</h3>
              <p>
                Designed around electronics, connected devices and practical
                maker technology.
              </p>
            </article>

            <article className="smartspark-feature-card">
              <div className="smartspark-feature-icon">
                <Wrench size={24} />
              </div>
              <h3>Practical by Design</h3>
              <p>
                Focused on useful, understandable solutions rather than
                unnecessary complexity.
              </p>
            </article>

            <article className="smartspark-feature-card">
              <div className="smartspark-feature-icon">
                <Sparkles size={24} />
              </div>
              <h3>Made for Innovation</h3>
              <p>
                Built with the same maker-first thinking behind the Spark Lab
                ecosystem.
              </p>
            </article>

            <article className="smartspark-feature-card">
              <div className="smartspark-feature-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Spark Lab Product</h3>
              <p>
                A dedicated in-house product line that can grow alongside our
                component and project ecosystem.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PRODUCT INFO */}
      <section className="section smartspark-details">
        <div className="container smartspark-details__grid">
          <div>
            <span className="smartspark-label">PRODUCT DEVELOPMENT</span>

            <h2>SmartSpark is Growing With Spark Lab</h2>

            <p>
              This page will become the official home for SmartSpark product
              information, features, technical specifications, documentation,
              updates and availability.
            </p>

            <p>
              We will only publish confirmed product information here as the
              product develops.
            </p>
          </div>

          <div className="smartspark-info-card">
            <div>
              <span>Brand</span>
              <strong>Spark Lab</strong>
            </div>

            <div>
              <span>Product</span>
              <strong>SmartSpark</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>In Development</strong>
            </div>

            <div>
              <span>Product Details</span>
              <strong>Coming Soon</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="smartspark-cta">
        <div className="container smartspark-cta__inner">
          <div>
            <span>BUILD. TEST. INNOVATE.</span>
            <h2>Interested in SmartSpark?</h2>
            <p>
              Contact Spark Lab for product updates, availability and future
              announcements.
            </p>
          </div>

          <Link to="/contact" className="btn smartspark-cta__button">
            Contact Spark Lab
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default SmartSpark