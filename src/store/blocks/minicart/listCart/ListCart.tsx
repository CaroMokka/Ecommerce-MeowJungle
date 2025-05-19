import ProductSummary from "../../../../components/ui/ProductSummary/ProductSummary";
import useCart from "../../../../api/cart/useCart"

function ListCart() {
  const { state } = useCart();
  const { cart } = state;


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
