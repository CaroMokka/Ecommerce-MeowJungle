import styles from "./productSummary.module.scss";
import useCart from "../../../api/cart/useCart";
import { ProductInfoProps } from "../../../components/ui/ProductSummary/types"

type BuyButtonProps = {
    product: ProductInfoProps["product"];
}

function BuyButton({ product }: BuyButtonProps) {
    const {  dispatch } = useCart();

    const handleAddToCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: product })
    }
    return (
        <button
            onClick={handleAddToCart}
            className={styles["product-summary__buy-button"]}
        >
            Add to cart
        </button>
    )
}
export default BuyButton;