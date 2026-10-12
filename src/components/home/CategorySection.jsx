import {
  BatteryCharging,
  Blocks,
  Bot,
  Cable,
  CircuitBoard,
  Cog,
  Cpu,
  Gauge,
  GraduationCap,
  PanelTop,
  Radar,
  Wrench,
} from 'lucide-react'
import { shopCategories } from '../../data/categories'
import CategoryCard from './CategoryCard'
import './CategorySection.css'

const categoryIcons = {
  BatteryCharging,
  Blocks,
  Bot,
  Cable,
  CircuitBoard,
  Cog,
  Cpu,
  Gauge,
  GraduationCap,
  PanelTop,
  Radar,
  Wrench,
}

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
          {shopCategories.map((category) => (
            <CategoryCard
              key={category.name}
              {...category}
              Icon={categoryIcons[category.icon]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
