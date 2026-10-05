import PageHeader from '../components/common/PageHeader'

function ProjectBuilder() {
  return (
    <section className="page-view section-navy-tint tech-grid section">
      <div className="container">
        <PageHeader
          eyebrow="Plan Your Build"
          title="Project Builder"
          description="Choose a project and discover the components needed to turn your idea into a working build."
        />
      </div>
    </section>
  )
}

export default ProjectBuilder
