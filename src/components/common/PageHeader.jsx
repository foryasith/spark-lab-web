import './PageHeader.css'

function PageHeader({ title, description, eyebrow }) {
  return (
    <header className="page-header">
      {eyebrow && <p className="page-header-eyebrow">{eyebrow}</p>}
      <h1 className="page-header-title">{title}</h1>
      <p className="page-header-description">{description}</p>
    </header>
  )
}

export default PageHeader
