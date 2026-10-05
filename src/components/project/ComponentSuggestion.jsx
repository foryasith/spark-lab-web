import { Boxes, ExternalLink, PackagePlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPriceLkr } from '../../utils/formatPrice'
import './ComponentSuggestion.css'

const statusLabels = {
  available: 'Available from Spark Lab',
  similar: 'Similar Product Available',
  'not-listed': 'Not Currently Listed',
  'needs-confirmation': 'Needs Confirmation',
}

function ComponentSuggestion({ suggestion, isSelected, onToggle }) {
  const { recommendation: component, product, matchType, status } = suggestion
  const legacyStatus = statusLabels[component.catalog_status]
    ? component.catalog_status
    : 'needs-confirmation'
  const statusClass = product
    ? matchType === 'exact'
      ? 'available'
      : 'similar'
    : 'not-listed'
  const statusLabel = status || statusLabels[legacyStatus]

  return (
    <article className={`component-suggestion is-${statusClass}`}>
      <label className="component-selection">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(suggestion.id)}
        />
        <span className="sr-only">Select {component.name}</span>
      </label>
      <span className="component-suggestion-icon">
        <Boxes aria-hidden="true" size={21} strokeWidth={1.6} />
      </span>
      <div>
        <div className="component-suggestion-heading">
          <h4>{component.name || 'Component to confirm'}</h4>
          <span>Qty {Number(component.quantity) > 0 ? Number(component.quantity) : 1}</span>
        </div>
        {component.category && <p className="component-suggestion-category">{component.category}</p>}
        {component.reason && <p>{component.reason}</p>}
        <span className={`component-status is-${statusClass}`}>{statusLabel}</span>

        {product ? (
          <div className="component-catalog-match">
            <strong>{product.name}</strong>
            <span>{formatPriceLkr(product.price_lkr)}</span>
            <small>{product.in_stock ? 'In Stock' : 'Out of Stock'}</small>
            <Link to={`/product/${product.slug}`}>
              View Product <ExternalLink aria-hidden="true" size={13} />
            </Link>
          </div>
        ) : (
          <button className="request-component-button" type="button" onClick={() => onToggle(suggestion.id)}>
            <PackagePlus aria-hidden="true" size={14} />
            {isSelected ? 'Remove Request' : 'Request This Component'}
          </button>
        )}
      </div>
    </article>
  )
}

export default ComponentSuggestion
