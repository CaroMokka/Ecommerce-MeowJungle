import { CartLine } from "../../../../services/cart/cartLines";
import ProductSummary from "../../../../components/ui/ProductSummary/ProductSummary";

type ListCartProps = {
  lines: CartLine[];
}

function ListCart({ lines }: ListCartProps) {
  return (
    <div>
      {lines.map((line) => {
        return (
          <ProductSummary
            key={line.productId}
            product={line.product}
            variant="minicart"
          />
        );
      })}
    </div>
  );
}

export default ListCart;