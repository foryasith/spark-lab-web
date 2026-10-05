import PageHeader from '../components/common/PageHeader'

function Cart() {
  return (
    <section className="page-view section-light section">
      <div className="container">
        <PageHeader
          eyebrow="Your Selected Components"
          title="Shopping Cart"
          description="Review the products selected for your next electronics or maker project."
        />
      </div>
    </section>
  )
}

export default Cart
