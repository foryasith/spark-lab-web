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
      <CategorySection showHeader={false} compact />
    </main>
  )
}

export default Categories
