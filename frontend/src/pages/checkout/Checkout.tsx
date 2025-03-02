import Stripe from "../../components/layout/header/stripePromotion/Stripe";
import ProductsListCheckout from "../../features/checkout/productsListCheckout/ProductsListCheckout";
import ResumeCheckout from "../../features/checkout/resumeCheckout/ResumeCheckout"

function Checkout() {
  return (
    <section className="cart-view__container">
      <Stripe />

      <div className="container-fluid d-flex">
        <div className="col-6 border border-black">
          <h1>Productos</h1>
          <div>partes de productos</div>
          <ProductsListCheckout />
        </div>
        <div className="col-6 border border-black">
          <ResumeCheckout/>
        </div>
      </div>
      <div>Vitrina de productos relacionados</div>
    </section>
  );
}

export default Checkout;
