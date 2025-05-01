import Stripe from "../store/blocks/header/stripePromotion/Stripe"
import ShippingForm from "./formsCheckout/ShippingForm"
import ResumeCheckout from "./resumeCheckout/ResumeCheckout"
function Shipping() {
  return (
    <section className="cart-view__container">
    <Stripe />

    <div className="container-fluid d-flex">
      <div className="col-6 border border-black">
        <ShippingForm/>
        <h1>Modo de Pago</h1>
      </div>
      <div className="col-6 border border-black">
        <ResumeCheckout/>
      </div>
    </div>
  </section>
  )
}

export default Shipping
