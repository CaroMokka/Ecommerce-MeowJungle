import { useState, useEffect } from "react";
import styles from "./productSummary.module.scss";
import useCart from "../../../context/cart/useCart";

type Props = {
  quantity?: number;
  productId: string | number;
}
function ProductQuantity({ quantity = 1, productId }: Props) {
    const [localQty, setLocalQty] = useState<number>(quantity);
    const { dispatch } = useCart()

    useEffect(() => {
        setLocalQty(quantity);
    }, [quantity]);
    const handleQuantityChange = (newQuantity: number) => {
        if(newQuantity < 1) return;
        dispatch({
          type: "CHANGE_QUANTITY",
          payload: { id: productId, quantity: newQuantity }
        })
        setLocalQty(newQuantity);
        // onChange?.(newQuantity); 
    } 
  return (
    <div className={styles["product-summary__quantity"]}>
    <button
      className={styles["product-summary__quantity--subt"]}
      onClick={() => handleQuantityChange(localQty - 1)}
      disabled={localQty <= 1}
    >
      -
    </button>
    <span className={styles["product-summary__quantity--total"]}>
      {localQty}
    </span>
    <button
      className={styles["product-summary__quantity--add"]}
      onClick={() => handleQuantityChange(localQty + 1)}
    >
      +
    </button>
  </div>
  );
}

export default ProductQuantity;
