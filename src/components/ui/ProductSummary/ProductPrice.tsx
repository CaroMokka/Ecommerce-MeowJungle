import style from "./productSummary.module.scss";

function ProductPrice({ unitPrice, subTotalPrice }: { unitPrice?: number, subTotalPrice?: number }) {
  return (
    <span className={style["product-summary__price"]}>
      {
        unitPrice && (
          <span className={style["product-summary__price--unit"]}>
            ${unitPrice?.toFixed(2)} <small>un</small>
          </span>
        )
      }
      {
        subTotalPrice && (
          <span className={style["product-summary__price--total"]}>
            <strong>${subTotalPrice?.toFixed(2)}</strong> <small>t</small>
          </span>
        )
      }

    </span>
  );
}
export default ProductPrice;