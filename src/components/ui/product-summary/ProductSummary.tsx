import { Link } from "react-router-dom";
import { ProductSummaryProps } from "./types";
import styles from "./productSummary.module.scss";

function ProductSummary({ product, variant, onClick }: ProductSummaryProps) {
  const handleClick = () => {
    if (onClick) {
      // onClick();
    }
  };

  return (
    <div
      className={`${styles["product-summary"]} ${
        styles[`product-summary--${variant}`]
      }`}
    >
      {variant === "minicart" && (
        <div className={styles["product-summary__container"]}>
          <div className={styles["product-summary__col-left"]}>
            <img
              src={product.image}
              className={styles["product-summary__image"]}
              alt={product.alt}
            />
          </div>
          <div className={styles["product-summary__col-right"]}>
            <div className={styles["product-summary__content"]}>
              <h3 className={styles["product-summary__name"]}>
                {product.name}
              </h3>
              <h5 className={styles["product-summary__brand"]}>
                {product.brand}
              </h5>
              <span className={styles["product-summary__price"]}>
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      )}
      {variant === "pdp" && (
        <div className={styles["product-summary__container"]}>
          <Link
            to={`/product/${product.id}`}
            className={styles["product-summary__col-left"]}
          >
            <img
              src={product.image}
              className={styles["product-summary__image"]}
              alt={product.alt}
            />
          </Link>
          <div className={styles["product-summary__col-right"]}>
            <div className={styles["product-summary__content"]}>
              <h3 className={styles["product-summary__name"]}>
                {product.name}
              </h3>
              <h5 className={styles["product-summary__brand"]}>
                {product.brand}
              </h5>
              <div>
                <p className={styles["product-summary__tags"]}>
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className={styles["product-summary__tag"]}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
                <p className={styles["product-summary__description"]}>
                  {product.description}
                </p>
              </div>
              <span className={styles["product-summary__price"]}>
                ${product.price}
              </span>
              <Link
                to="/cart"
                onClick={handleClick}
                className={styles["product-summary__buy-button"]}
              >
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      )}
      {variant === "shelf" && (
        <div className={styles["product-summary__container"]}>
          
          <div className={styles["product-summary__col-right"]}>
            <div className={styles["product-summary__content"]}>
              <h3 className={styles["product-summary__name"]}>
                {product.name}
              </h3>
              <h5 className={styles["product-summary__brand"]}>
                {product.brand}
              </h5>

              <span className={styles["product-summary__price"]}>
                ${product.price}
              </span>
              {variant === "shelf" && (
                <Link
                  to="/cart"
                  onClick={handleClick}
                  className={styles["product-summary__buy-button"]}
                >
                  Add to cart
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSummary;
