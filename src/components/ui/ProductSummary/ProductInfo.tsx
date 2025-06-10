import TagList from "./TagList";
import BuyButton from "./BuyButton";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import DeleteButton from "./DeleteButton"
import styles from "./productSummary.module.scss";
import { ProductInfoProps } from "./types";
import useCart from "../../../api/cart/useCart";

function ProductInfo({ product, variant }: ProductInfoProps) {
  const { state } = useCart();
  const { cart } = state;

  const productInCart = cart.find((item) => item.id === product.id);
  const quantity = productInCart?.quantity ?? 1;
  const subTotal = (product.price ?? 0) * quantity;

  return (
    <div className={styles["product-summary__col-right"]}>
      <div className={styles["product-summary__content"]}>
        <h3 className={styles["product-summary__name"]}>{product.name}</h3>
        <h5 className={styles["product-summary__brand"]}>{product.brand}</h5>

        {variant === "pdp" && (
          <>
            <TagList tags={product.tags} />
            <p className={styles["product-summary__description"]}>
              {product.description}
            </p>
          </>
        )}

        <ProductPrice unitPrice={product.price} />

        {(variant === "pdp" || variant === "shelf") && (
          <BuyButton product={product} />
        )}
        {variant === "minicart" && (
          <>
            <ProductQuantity quantity={quantity ?? 1} productId={product.id} />
            {quantity > 1 && <ProductPrice subTotalPrice={subTotal} />}
            <DeleteButton
              product={product}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default ProductInfo;
