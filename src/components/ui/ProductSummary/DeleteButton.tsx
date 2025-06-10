import useCart  from "../../../api/cart/useCart";
import { ProductInfoProps } from "./types";

type DeleteButtonProps = {
    product: ProductInfoProps["product"];
}
  
  const DeleteButton = ({ product }: DeleteButtonProps) => {
    const { dispatch } = useCart();
    const handleDelete = () => {
      dispatch({ type: "REMOVE_FROM_CART", payload: String(product.id) });
    };
    return (
      <button onClick={handleDelete}>
        Eliminar producto
      </button>
    );
  };
  
  export default DeleteButton;