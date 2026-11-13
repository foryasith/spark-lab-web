import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './CategoryCard.css'

function CategoryCard({ name, description, Icon, compact = false }) {
  const categoryUrl = `/shop?category=${encodeURIComponent(name)}`

  return (
    <Link className={`category-card ${compact ? 'is-compact' : ''}`} to={categoryUrl}>
      <span className="category-card-icon">
        <Icon aria-hidden="true" size={compact ? 68 : 27} strokeWidth={1.45} />
      </span>
      <h3>{name}</h3>
      <p>{description}</p>
      <span className="category-card-link">
        {compact ? <>
          Explore
          <ArrowRight aria-hidden="true" size={16} />
        </> : <>
          Shop Category
          <ArrowRight aria-hidden="true" size={17} />
        </>}
      </span>
    </Link>
  )
}

export default CategoryCard
