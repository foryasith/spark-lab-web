import './SupportAreaCard.css'

function SupportAreaCard({ Icon, title, description }) {
  return (
    <article className="support-area-card">
      <span className="support-area-icon">
        <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default SupportAreaCard
