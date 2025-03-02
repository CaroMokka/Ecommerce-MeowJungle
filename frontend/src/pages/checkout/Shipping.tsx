import Stripe from "../../components/layout/header/stripePromotion/Stripe"
import ResumeCheckout from "../../features/checkout/resumeCheckout/ResumeCheckout"
function Shipping() {
  return (
    <section className="cart-view__container">
    <Stripe />

    <div className="container-fluid d-flex">
      <div className="col-6 border border-black">
        <h1>Información de entrega</h1>
        <h1>Modo de Pago</h1>
      </div>
      <div className="col-6 border border-black">
        <ResumeCheckout/>
      </div>
    </div>
    <div>Vitrina de productos relacionados</div>
  </section>
  )
}

export default Shipping
