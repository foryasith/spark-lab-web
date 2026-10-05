import {
  Blocks,
  Bot,
  CircuitBoard,
  Cog,
  Cpu,
  GraduationCap,
  Radar,
  Wrench,
} from 'lucide-react'
import CategoryCard from './CategoryCard'
import './CategorySection.css'

const categories = [
  {
    name: 'Development Boards',
    description: 'Arduino, ESP32, Raspberry Pi and more.',
    Icon: Cpu,
  },
  {
    name: 'Sensors',
    description: 'Distance, temperature, motion and environmental sensors.',
    Icon: Radar,
  },
  {
    name: 'Modules',
    description: 'Displays, relays, communication and control modules.',
    Icon: Blocks,
  },
  {
    name: 'Robotics',
    description: 'Chassis, wheels, controllers and robot-building parts.',
    Icon: Bot,
  },
  {
    name: 'Motors & Actuators',
    description: 'Motors, servos and motion components for practical builds.',
    Icon: Cog,
  },
  {
    name: 'Electronic Components',
    description: 'Essential components for circuits, repairs and prototypes.',
    Icon: CircuitBoard,
  },
  {
    name: 'Tools',
    description: 'Soldering, measuring and workshop tools for makers.',
    Icon: Wrench,
  },
  {
    name: 'Kits & Education',
    description: 'Learning kits and project sets for students and beginners.',
    Icon: GraduationCap,
  },
]

function CategorySection() {
  return (
    <section className="category-section section" aria-labelledby="categories-title">
      <div className="container">
        <header className="section-header category-section-header">
          <p className="category-section-label">Component Library</p>
          <h2 id="categories-title" className="section-title">
            Explore Components
          </h2>
          <p className="section-subtitle">
            Everything you need to build, test and innovate.
          </p>
        </header>

        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
