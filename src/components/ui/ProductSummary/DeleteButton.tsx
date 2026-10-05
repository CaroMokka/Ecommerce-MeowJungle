import useCart  from "../../../context/cart/useCart";
import { track } from "../../../services/analytics/analytics";
import { ProductInfoProps } from "./types";

type DeleteButtonProps = {
    product: ProductInfoProps["product"];
}

  const DeleteButton = ({ product }: DeleteButtonProps) => {
    const { dispatch } = useCart();
    const handleDelete = () => {
      dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
      track("remove_from_cart", {
        productId: product.id,
        productName: product.name,
      });
    };
    return (
      <button onClick={handleDelete}>
        Eliminar producto
      </button>
    );
  };
  
  export default DeleteButton;