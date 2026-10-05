import { ArrowRight, Bot, CircuitBoard, Clock3, Cpu, Radio, Ruler, Wrench } from 'lucide-react'
import './LearningCard.css'

const topicIcons = {
  'Arduino Basics': Cpu,
  'ESP32 & IoT': Radio,
  Sensors: Ruler,
  Robotics: Bot,
  'Electronics Fundamentals': CircuitBoard,
  'DIY Projects': Wrench,
}

function LearningCard({ item, featured = false }) {
  const Icon = topicIcons[item.category] ?? CircuitBoard

  return (
    <article className={`learning-card${featured ? ' is-featured' : ''}`} id={`guide-${item.slug}`}>
      <div className="learning-card-visual" aria-hidden="true">
        <Icon size={featured ? 36 : 30} strokeWidth={1.5} />
        <span>{item.category}</span>
      </div>

      <div className="learning-card-content">
        <div className="learning-card-badges">
          <span>{item.category}</span>
          <span>{item.difficulty}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="learning-card-footer">
          <span className="learning-card-time">
            <Clock3 aria-hidden="true" size={15} />
            {item.estimated_time}
          </span>
          <span className="learning-card-action" aria-label={`${item.title} guide coming soon`}>
            Explore Guide
            <ArrowRight aria-hidden="true" size={16} />
          </span>
        </div>
      </div>
    </article>
  )
}

export default LearningCard
