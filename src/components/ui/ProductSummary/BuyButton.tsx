import styles from "./productSummary.module.scss";
import useCart from "../../../context/cart/useCart";
import { track } from "../../../services/analytics/analytics";
import { getUnitPrice } from "../../../services/cart/cartLines";
import { ProductInfoProps } from "../../../components/ui/ProductSummary/types"

type BuyButtonProps = {
    product: ProductInfoProps["product"];
    variantId?: string;
    disabled?: boolean;
}

function BuyButton({ product, variantId, disabled = false }: BuyButtonProps) {
    const {  dispatch } = useCart();

    const handleAddToCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: { productId: product.id, variantId } })
        track("add_to_cart", {
            productId: product.id,
            productName: product.name,
            price: getUnitPrice(product, variantId),
            variantId,
        })
    }
    return (
        <button
            type="button"
            onClick={handleAddToCart}
            disabled={disabled}
            className={styles["product-summary__buy-button"]}
        >
            {disabled ? "Agotado" : "Añadir al carrito"}
        </button>
    )
}
export default BuyButton;
