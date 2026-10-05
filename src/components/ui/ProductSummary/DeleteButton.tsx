import useCart  from "../../../context/cart/useCart";
import { track } from "../../../services/analytics/analytics";
import { ProductInfoProps } from "./types";

type DeleteButtonProps = {
    product: ProductInfoProps["product"];
    variantId?: string;
}

  const DeleteButton = ({ product, variantId }: DeleteButtonProps) => {
    const { dispatch } = useCart();
    const handleDelete = () => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { productId: product.id, variantId },
      });
      track("remove_from_cart", {
        productId: product.id,
        productName: product.name,
        variantId,
      });
    };
    return (
      <button type="button" onClick={handleDelete}>
        Eliminar producto
      </button>
    );
  };

  export default DeleteButton;
