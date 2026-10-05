import PageHeader from '../components/common/PageHeader'

function Home() {
  return (
    <section className="page-view section-light tech-background orbit-accent section">
      <div className="container">
        <PageHeader
          eyebrow="Build. Test. Innovate."
          title="Spark Lab"
          description="Electronics, IoT, robotics and maker solutions for students, makers and innovators."
        />
      </div>
    </section>
  )
}

export default Home
