import style from "./productSummary.module.scss";
import { formatPrice } from "../../../utils/formatPrice";

function ProductPrice({ unitPrice, subTotalPrice }: { unitPrice?: number, subTotalPrice?: number }) {
  return (
    <span className={style["product-summary__price"]}>
      {
        unitPrice && (
          <span className={style["product-summary__price--unit"]}>
            {formatPrice(unitPrice)} <small>un</small>
          </span>
        )
      }
      {
        subTotalPrice && (
          <span className={style["product-summary__price--total"]}>
            <strong>{formatPrice(subTotalPrice)}</strong> <small>t</small>
          </span>
        )
      }

    </span>
  );
}
export default ProductPrice;