import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import ProjectBuilderPromo from '../components/home/ProjectBuilderPromo'
import WhySparkLab from '../components/home/WhySparkLab'
import SupportPromo from '../components/home/SupportPromo'
import LearnPromo from '../components/home/LearnPromo'
import FinalShopCTA from '../components/home/FinalShopCTA'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ProjectBuilderPromo />
      <WhySparkLab />
      <SupportPromo />
      <LearnPromo />
      <FinalShopCTA />
    </>
  )
}

export default Home