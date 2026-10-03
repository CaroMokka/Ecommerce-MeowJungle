import styles from "./productSummary.module.scss";
import useCart from "../../../context/cart/useCart";

type Props = {
  quantity?: number;
  productId: number;
}
function ProductQuantity({ quantity = 1, productId }: Props) {
    const { dispatch } = useCart()

    const handleQuantityChange = (newQuantity: number) => {
        if(newQuantity < 1) return;
        dispatch({
          type: "CHANGE_QUANTITY",
          payload: { productId, quantity: newQuantity }
        })
    }
  return (
    <div className={styles["product-summary__quantity"]}>
    <button
      className={styles["product-summary__quantity--subt"]}
      onClick={() => handleQuantityChange(quantity - 1)}
      disabled={quantity <= 1}
    >
      -
    </button>
    <span className={styles["product-summary__quantity--total"]}>
      {quantity}
    </span>
    <button
      className={styles["product-summary__quantity--add"]}
      onClick={() => handleQuantityChange(quantity + 1)}
    >
      +
    </button>
  </div>
  );
}

export default ProductQuantity;