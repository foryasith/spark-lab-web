import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './CategoryCard.css'

function CategoryCard({ name, description, Icon }) {
  const categoryUrl = `/shop?category=${encodeURIComponent(name)}`

  return (
    <Link className="category-card" to={categoryUrl}>
      <span className="category-card-icon">
        <Icon aria-hidden="true" size={27} strokeWidth={1.6} />
      </span>
      <h3>{name}</h3>
      <p>{description}</p>
      <span className="category-card-link">
        Shop Category
        <ArrowRight aria-hidden="true" size={17} />
      </span>
    </Link>
  )
}

export default CategoryCard
