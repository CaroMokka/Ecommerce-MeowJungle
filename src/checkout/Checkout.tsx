import Stripe from "../store/blocks/header/stripePromotion/Stripe";
import ProductsListCheckout from "./productsListCheckout/ProductsListCheckout";
import ResumeCheckout from "./resumeCheckout/ResumeCheckout"
import useCart from "../context/cart/useCart";



function Checkout() {
  const { state } = useCart()
  const { cart } = state;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item)=> acc + item.quantity * (item.price ?? 0), 0)

  return (
    <section className="cart-view__container">
      <Stripe />

      <div className="container-fluid d-flex">
        <div className="col-6 border border-black">
          <h1>Productos</h1>
          <div>partes de productos</div>
          <ProductsListCheckout cart={cart} />
        </div>
        <div className="col-6 border border-black">
          <ResumeCheckout totalItems={totalItems} totalAmount={totalAmount} />
        </div>
      </div>
      <div>Vitrina de productos relacionados</div>
    </section>
  );
}

export default Checkout;
