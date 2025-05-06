// import { Link } from "react-router-dom";
import TagList from "./TagList";
import BuyButton from "./BuyButton";
import ProductPrice from "./ProductPrice";
import styles from "./productSummary.module.scss";
import { ProductInfoProps } from "./types";

function ProductInfo({ product, variant, onClick }: ProductInfoProps) {
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

        <ProductPrice value={product.price} />

        {(variant === "pdp" || variant === "shelf") && (
          <BuyButton to="/cart" onClick={onClick} />
        )}
      </div>
    </div>
  );
}
export default ProductInfo;
