import PageHeader from '../components/common/PageHeader'

function ProductDetails() {
  return (
    <section className="page-view section-light tech-grid section">
      <div className="container">
        <PageHeader
          eyebrow="Spark Lab Product"
          title="Product Details"
          description="Product specifications, availability and ordering information will appear here."
        />
      </div>
    </section>
  )
}

export default ProductDetails
