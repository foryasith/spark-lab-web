import sparkLabLogo from '../../assets/brand/spark-lab-logo.png'
import './Logo.css'

const sizeClasses = {
  small: 'brand-logo--small',
  medium: 'brand-logo--medium',
  large: 'brand-logo--large',
}

function Logo({ size = 'medium', className = '' }) {
  const sizeClass = sizeClasses[size] ?? sizeClasses.medium
  const classes = ['brand-logo', sizeClass, className].filter(Boolean).join(' ')

  return (
    <img
      className={classes}
      src={sparkLabLogo}
      alt="Spark Lab — Build. Test. Innovate."
    />
  )
}

export default Logo
