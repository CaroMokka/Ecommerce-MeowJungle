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
            key={line.lineKey}
            product={line.product}
            variant="minicart"
            variantId={line.variantId}
          />
        );
      })}
    </div>
  );
}

export default ListCart;