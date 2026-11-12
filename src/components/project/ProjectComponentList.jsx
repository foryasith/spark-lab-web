import { CircleCheck, CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ProjectComponentList.css'

function ProjectComponentList({
  title,
  components,
  productsBySlug,
  selectedProductSlugs = new Set(),
  onToggleProduct,
}) {
  if (components.length === 0) return null

  return (
    <div className="project-component-section">
      <h3>{title}</h3>
      <ul>
        {components.map((component) => {
          const product = component.productSlug
            ? productsBySlug.get(component.productSlug)
            : null
          const canSelect = Boolean(product?.in_stock)
          const isSelected = Boolean(product && selectedProductSlugs.has(product.slug))

          return (
            <li key={component.name} className={isSelected ? 'is-selected' : ''}>
              {canSelect ? (
                <label className="project-component-select">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleProduct?.(product.slug)}
                  />
                  <span className="sr-only">Select {component.name} for cart</span>
                </label>
              ) : product ? (
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
                      ? 'Available in Shop — select to add to cart'
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
