import { CartAction, CartState } from "./cartTypes";
import { getLineKey } from "../../services/cart/cartLines";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, variantId } = action.payload;
      if (!Number.isInteger(productId)) {
        return state;
      }
      const lineKey = getLineKey({ productId, variantId });
      const exists = state.cart.some((item) => getLineKey(item) === lineKey);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            getLineKey(item) === lineKey
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { productId, variantId, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      const lineKey = getLineKey(action.payload);
      return {
        ...state,
        cart: state.cart.filter((item) => getLineKey(item) !== lineKey),
      };
    }
    case "CHANGE_QUANTITY": {
      const { quantity } = action.payload;
      const lineKey = getLineKey(action.payload);
      return {
        ...state,
        cart: state.cart.map((item) =>
          getLineKey(item) === lineKey
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { cart: [] };

    default:
      return state;
  }
};
