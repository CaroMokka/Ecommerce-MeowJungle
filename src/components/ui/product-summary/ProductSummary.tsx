import { Link } from "react-router-dom";
import styles from "./productSummary.module.scss";

type ProductSummaryProps = {
  name?: string;
  description?: string;
  image?: string;
  alt?: string;
  price?: number;
  brand?: string;
};

function ProductSummary({ name, brand,description, image, alt, price }: ProductSummaryProps) {
  return (
    <div className={styles["product-summary"]}>
      <div className={styles["product-summary__wrapper"]}>
        <img
          src={image}
          className={styles["product-summary__image"]}
          alt={alt}
        />
        <div className={styles["product-summary__content"]}>
          <h3 className={styles["product-summary__name"]}>{name}</h3>
          <h5 className={styles["product-summary__brand"]}>{brand}</h5>
          <p className={styles["product-summary__description"]}>
            {description}
          </p>
          <span className={styles["product-summary__price"]}>{price}</span>
          <Link to="/cart" className={styles["product-summary__buy-button"]}>
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductSummary;
