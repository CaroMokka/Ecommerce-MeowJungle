// import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { ProductSummaryProps } from "./types";
import styles from "./productSummary.module.scss";
import ProductInfo from "./ProductInfo";

function ProductSummary({ product, variant, onClick }: ProductSummaryProps) {
  const isLink = variant === "pdp" || variant === "shelf";
  return (
    <div
      className={`${styles["product-summary"]} ${
        styles[`product-summary--${variant}`]
      }`}
    >
      <div className={styles["product-summary__container"]}>
        <ProductImage
          src={product.image}
          alt={product.alt}
          linkTo={isLink ? `/product/${product.id}` : undefined}
        />
        <ProductInfo product={product} variant={variant} onClick={onClick} />
      </div>
    </div>
  );
}

export default ProductSummary;
