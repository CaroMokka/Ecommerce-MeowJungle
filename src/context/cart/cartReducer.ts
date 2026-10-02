import { CartAction, CartState } from "./cartTypes";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const productId = action.payload;
      if (!Number.isInteger(productId)) {
        return state;
      }
      const exists = state.cart.find((item) => item.productId === productId);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { productId, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    }
    case "CHANGE_QUANTITY": {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === productId
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
