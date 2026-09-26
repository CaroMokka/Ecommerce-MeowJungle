import { useLocation } from "react-router-dom";
import InvoiceSummary from "../InvoiceSummary/InvoiceSummary";
import Stripe from "../../store/blocks/header/stripePromotion/Stripe";
import ProductsListCheckout from "../productsListCheckout/ProductsListCheckout";
import ShippingForm from "../formsCheckout/ShippingForm";
import {PaymentMethodForm} from "../formsCheckout/PaymentForm";
import {ProfileForm} from "../formsCheckout/ProfileForm";
import Confirmation from "../confirmation/Confirmation";
import useCart from "../../context/cart/useCart";

function CheckoutLayout() {
  const { state } = useCart();
  const { cart } = state;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * (item.price ?? 0),
    0
  );

  const location = useLocation();
  const isCheckout = location.pathname === "/cart";
  const step = location.pathname;
  return (
    <section className="cart-view__container">
      <Stripe />
      <div className="container-fluid d-flex justify-content-between p-3">
        <div className="col-5">
          {isCheckout && (
            <>
              <h3>Productos</h3>
              <ProductsListCheckout cart={cart} />
            </>
          )}
          {step === "/checkout/profile" && <ProfileForm />}
          {step === "/checkout/shipping" && <ShippingForm />}
          {step === "/checkout/payment" && <PaymentMethodForm />}
          {step === "/checkout/confirmation" && <Confirmation />}
        </div>
        <div className="col-5">
          <InvoiceSummary totalItems={totalItems} totalAmount={totalAmount} />
        </div>
      </div>
    </section>
  );
}

export default CheckoutLayout;
