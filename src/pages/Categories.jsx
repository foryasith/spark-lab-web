import PageHeader from '../components/common/PageHeader'
import CategorySection from '../components/home/CategorySection'
import useSeo from '../hooks/useSeo'

function Categories() {
  useSeo({
    title: 'Product Categories | Spark Lab',
    description:
      'Explore electronics, IoT, robotics, sensor modules and prototyping categories at Spark Lab Sri Lanka.',
  })

  return (
    <main className="categories-page">
      {/* Page introduction */}
      <section className="section section-light tech-grid">
        <div className="container">
          <PageHeader
            eyebrow="Browse the Catalog"
            title="Product Categories"
            description="Find the right boards, sensors, modules, tools and parts for your next build."
          />
        </div>
      </section>

      {/* Full component category grid */}
      <CategorySection />
    </main>
  )
}

export default Categories