import { useState, useEffect } from "react";
import styles from "./productSummary.module.scss";

type Props = {
  quantity?: number;
  onChange?: (newQty: number) => void;
}
function ProductQuantity({ quantity = 1,onChange }: Props) {
    const [localQty, setLocalQty] = useState<number>(quantity);

    useEffect(() => {
        setLocalQty(quantity);
    }, [quantity]);
    const handleQuantityChange = (newQuantity: number) => {
        if(newQuantity < 1) return;
        setLocalQty(newQuantity);
        onChange?.(newQuantity); 
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
