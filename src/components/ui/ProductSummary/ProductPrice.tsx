import style from "./productSummary.module.scss";

function ProductPrice({ value }: { value?: number }) {
  return (
    <span className={style["product-summary__price"]}>
      ${value?.toFixed(2)}
    </span>
  );
}
export default ProductPrice;