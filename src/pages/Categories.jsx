import PageHeader from '../components/common/PageHeader'
import useSeo from '../hooks/useSeo'

function Categories() {
  useSeo({
    title: 'Product Categories | Spark Lab',
    description:
      'Explore electronics, IoT, robotics, sensor modules and prototyping categories at Spark Lab Sri Lanka.',
  })

  return (
    <section className="page-view section-light circuit-nodes section">
      <div className="container">
        <PageHeader
          eyebrow="Browse the Catalog"
          title="Product Categories"
          description="Find the right boards, sensors, modules, tools and parts for your next build."
        />
      </div>
    </section>
  )
}

export default Categories
