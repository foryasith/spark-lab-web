import { ArrowRight, Bot, CircuitBoard, Cpu, Radio, Ruler, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState'
import LearningCard from '../components/learn/LearningCard'
import { learningContent, learningTopics } from '../data/learningContent'
import useSeo from '../hooks/useSeo'
import './Learn.css'

const topicIcons = {
  'Arduino Basics': Cpu,
  'ESP32 & IoT': Radio,
  Sensors: Ruler,
  Robotics: Bot,
  'Electronics Fundamentals': CircuitBoard,
  'DIY Projects': Wrench,
}

function Learn() {
  useSeo({
    title: 'Maker Guides & Learning Hub | Spark Lab',
    description:
      'Learn electronics, Arduino, ESP32, sensors and robotics with Spark Lab guides and project tutorials.',
  })
  const featuredGuides = learningContent.filter((item) => item.featured).slice(0, 2)
  const projectIdeas = learningContent.filter((item) =>
    ['Robotics', 'DIY Projects'].includes(item.category),
  )

  return (
    <div className="learn-page">
      <section className="learn-hero tech-grid section">
        <div className="container">
          <span>Learn &amp; Builds</span>
          <h1>Learn. Build. Explore.</h1>
          <p>
            Guides, project ideas and practical resources to help you build with
            electronics, IoT and robotics.
          </p>
        </div>
      </section>

      <section className="learn-featured section" aria-labelledby="featured-guides-title">
        <div className="container">
          <header className="learn-section-heading">
            <span>Start Here</span>
            <h2 id="featured-guides-title">Featured Guides</h2>
            <p>Approachable starting points for your next skill or project.</p>
          </header>
          <div className="learn-featured-grid">
            {featuredGuides.map((item) => (
              <LearningCard key={item.id} item={item} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="learn-topics section" aria-labelledby="learn-topics-title">
        <div className="container">
          <header className="learn-section-heading">
            <span>Find Your Topic</span>
            <h2 id="learn-topics-title">Browse by Topic</h2>
          </header>
          <div className="learn-topic-grid">
            {learningTopics.map((topic) => {
              const Icon = topicIcons[topic] ?? CircuitBoard
              const guideCount = learningContent.filter((item) => item.category === topic).length

              return (
                <a key={topic} href="#all-guides" className="learn-topic-card">
                  <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
                  <span>
                    <strong>{topic}</strong>
                    <small>{guideCount} {guideCount === 1 ? 'guide' : 'guides'}</small>
                  </span>
                  <ArrowRight aria-hidden="true" size={17} />
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="learn-all section" id="all-guides" aria-labelledby="all-guides-title">
        <div className="container">
          <header className="learn-section-heading">
            <span>Learning Library</span>
            <h2 id="all-guides-title">Latest Guides</h2>
            <p>Short, practical introductions created for students and makers.</p>
          </header>
          {learningContent.length > 0 ? (
            <div className="learn-guide-grid">
              {learningContent.map((item) => (
                <LearningCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No guides available."
              message="New Spark Lab learning resources are being prepared."
            />
          )}
        </div>
      </section>

      <section className="learn-projects section" aria-labelledby="project-ideas-title">
        <div className="container learn-projects-layout">
          <div>
            <span>Put Learning Into Practice</span>
            <h2 id="project-ideas-title">Project Ideas</h2>
            <p>Use a guided build to connect components, code and practical problem-solving.</p>
          </div>
          <ul>
            {projectIdeas.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.difficulty} · {item.estimated_time}</span>
              </li>
            ))}
          </ul>
          <Link className="btn btn-outline" to="/project-builder">
            Explore Project Builder
          </Link>
        </div>
      </section>

      <section className="learn-shop-cta section">
        <div className="container">
          <div>
            <span>Ready to Start?</span>
            <h2>Need Components for Your Build?</h2>
            <p>Explore boards, sensors, robotics parts and maker tools in the Spark Lab shop.</p>
          </div>
          <Link className="btn btn-secondary" to="/shop">
            Shop Components
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Learn
