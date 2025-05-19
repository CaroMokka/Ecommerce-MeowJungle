import { CartItem } from "../../../../api/cart/cartTypes";
import ProductSummary from "../../../../components/ui/ProductSummary/ProductSummary";


type ListCartProps = {
  cart: CartItem[];
}
function ListCart({ cart }: ListCartProps) {



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

export default ListCart;
