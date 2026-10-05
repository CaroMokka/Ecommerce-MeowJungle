import styles from "./productSummary.module.scss";
import useCart from "../../../context/cart/useCart";
import { track } from "../../../services/analytics/analytics";
import { ProductInfoProps } from "../../../components/ui/ProductSummary/types"

type BuyButtonProps = {
    product: ProductInfoProps["product"];
}

function BuyButton({ product }: BuyButtonProps) {
    const {  dispatch } = useCart();

    const handleAddToCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: product.id })
        track("add_to_cart", {
            productId: product.id,
            productName: product.name,
            price: product.price,
        })
    }
    return (
        <button
            onClick={handleAddToCart}
            className={styles["product-summary__buy-button"]}
        >
            Añadir al carrito
        </button>
    )
}
export default BuyButton;