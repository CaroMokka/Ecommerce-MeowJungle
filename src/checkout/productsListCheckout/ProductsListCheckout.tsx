import ProductSummary from "../../components/ui/ProductSummary/ProductSummary";
import { CartLine } from "../../services/cart/cartLines";

type ProductsListCheckoutProps = {
  lines: CartLine[];
}

function ProductsListCheckout({ lines }: ProductsListCheckoutProps) {

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

export default ProductsListCheckout;