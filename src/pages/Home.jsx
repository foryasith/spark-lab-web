import FeaturedProducts from '../components/home/FeaturedProducts'
import Hero from '../components/home/Hero'
import useSeo from '../hooks/useSeo'

function Home() {
  useSeo({
    title: 'Spark Lab | IoT, Robotics & Electronics Components Sri Lanka',
    description:
      'Shop electronics, IoT, robotics and maker components for student projects and innovative builds with Spark Lab Sri Lanka.',
  })

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Home
