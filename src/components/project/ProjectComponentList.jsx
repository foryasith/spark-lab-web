import { CircleCheck, CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ProjectComponentList.css'

function ProjectComponentList({ title, components, productsBySlug }) {
  if (components.length === 0) return null

  return (
    <div className="project-component-section">
      <h3>{title}</h3>
      <ul>
        {components.map((component) => {
          const product = component.productSlug
            ? productsBySlug.get(component.productSlug)
            : null

          return (
            <li key={component.name}>
              {product ? (
                <CircleCheck aria-hidden="true" size={18} />
              ) : (
                <CircleHelp aria-hidden="true" size={18} />
              )}
              <span>
                {product ? (
                  <Link to={`/product/${product.slug}`}>{component.name}</Link>
                ) : (
                  <strong>{component.name}</strong>
                )}
                <small>
                  {product
                    ? product.in_stock
                      ? 'Available in Shop'
                      : 'Check availability'
                    : 'Not currently listed'}
                </small>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProjectComponentList
