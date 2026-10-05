import TagList from "./TagList";
import BuyButton from "./BuyButton";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import DeleteButton from "./DeleteButton"
import styles from "./productSummary.module.scss";
import { ProductInfoProps } from "./types";
import useCart from "../../../context/cart/useCart";
import {
  findVariant,
  getLineKey,
  getUnitPrice,
} from "../../../services/cart/cartLines";

function ProductInfo({
  product,
  variant,
  variantId,
  unitPrice,
  addDisabled,
  children,
}: ProductInfoProps) {
  const { lines } = useCart();

  const lineKey = getLineKey({ productId: product.id, variantId });
  const productLine = lines.find((line) => line.lineKey === lineKey);
  const selectedVariant = findVariant(product, variantId);
  const quantity = productLine?.quantity ?? 1;
  const displayUnitPrice = unitPrice ?? getUnitPrice(product, variantId);
  const subTotal = productLine?.lineTotal ?? displayUnitPrice;

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

        <ProductPrice unitPrice={displayUnitPrice} />

        {children}

        {(variant === "pdp" || variant === "shelf") && (
          <BuyButton
            product={product}
            variantId={variantId}
            disabled={addDisabled}
          />
        )}
        {variant === "minicart" && (
          <>
            {selectedVariant && (
              <small className={styles["product-summary__brand"]}>
                {selectedVariant.name}
              </small>
            )}
            <ProductQuantity
              quantity={quantity ?? 1}
              productId={product.id}
              variantId={variantId}
            />
            {quantity > 1 && <ProductPrice subTotalPrice={subTotal} />}
            <DeleteButton
              product={product}
              variantId={variantId}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default ProductInfo;
