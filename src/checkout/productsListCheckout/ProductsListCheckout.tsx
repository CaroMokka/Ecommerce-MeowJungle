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
            key={line.productId}
            product={line.product}
            variant="minicart"
          />
        );
      })}
    </div>
  );
}

export default ProductsListCheckout;