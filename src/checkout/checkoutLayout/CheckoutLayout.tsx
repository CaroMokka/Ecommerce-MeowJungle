import InvoiceSummary from "../InvoiceSummary/InvoiceSummary";
import Stripe from "../../store/blocks/header/stripePromotion/Stripe";
import ProductsListCheckout from "../productsListCheckout/ProductsListCheckout";
import ShippingForm from "../formsCheckout/ShippingForm";
import {PaymentMethodForm} from "../formsCheckout/PaymentForm";
import {ProfileForm} from "../formsCheckout/ProfileForm";
import Confirmation from "../confirmation/Confirmation";
import useCart from "../../context/cart/useCart";
import { calculateCartTotals } from "../../services/cart/cartTotals";
import useCheckout from "../../context/checkout/useCheckout";

function CheckoutLayout() {
  const { lines } = useCart();
  const { itemCount: totalItems, subtotal: totalAmount } =
    calculateCartTotals(lines);
  const { activeStep } = useCheckout();

  return (
    <section className="cart-view__container">
      <Stripe />
      <div className="container-fluid d-flex justify-content-between p-3">
        <div className="col-5">
          {activeStep === "cart" && (
            <>
              <h3>Productos</h3>
              <ProductsListCheckout lines={lines} />
            </>
          )}
          {activeStep === "profile" && <ProfileForm />}
          {activeStep === "shipping" && <ShippingForm />}
          {activeStep === "payment" && <PaymentMethodForm />}
          {activeStep === "confirmation" && <Confirmation />}
        </div>
        <div className="col-5">
          <InvoiceSummary totalItems={totalItems} totalAmount={totalAmount} />
        </div>
      </div>
    </section>
  );
}

export default CheckoutLayout;
