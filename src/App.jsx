function App() {
  return (
    <main className="style-preview">
      <section className="section" aria-labelledby="preview-title">
        <div className="container">
          <div className="card preview-card">
            <p className="preview-brand">Spark Lab</p>
            <h1 id="preview-title">Build. Test. Innovate.</h1>
            <p className="preview-description text-muted">
              Electronics, IoT, robotics and maker solutions for students and
              innovators.
            </p>
            <div className="preview-actions" aria-label="Example actions">
              <button className="btn btn-primary" type="button">
                Shop Components
              </button>
              <button className="btn btn-secondary" type="button">
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
