import { Minus, Plus } from 'lucide-react'
import './QuantitySelector.css'

function QuantitySelector({
  quantity,
  productName,
  onDecrease,
  onIncrease,
  decreaseDisabled = false,
  increaseDisabled = false,
}) {
  return (
    <div className="quantity-selector" aria-label={`Quantity for ${productName}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={`Decrease ${productName} quantity`}
      >
        <Minus aria-hidden="true" size={16} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={increaseDisabled}
        aria-label={`Increase ${productName} quantity`}
      >
        <Plus aria-hidden="true" size={16} />
      </button>
    </div>
  )
}

export default QuantitySelector
