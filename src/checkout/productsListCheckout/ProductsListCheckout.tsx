import ProductSummary from "../../components/ui/ProductSummary/ProductSummary";
import { CartItem } from "../../context/cart/cartTypes";

type ProductsListCheckoutProps = {
  cart: CartItem[];
}

function ProductsListCheckout({ cart }: ProductsListCheckoutProps) {

  return (
    <div>
      {cart.map((item) => {
        return (
          <ProductSummary
            key={item.id}
            product={item}
            variant="minicart"
          />
        );
      })}
    </div>
  );
}

export default ProductsListCheckout;
