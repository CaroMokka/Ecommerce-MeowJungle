import { CartAction, CartState } from "./cartTypes";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      const idCartItem = Number(action.payload);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== idCartItem),
      };
    }
    case "CHANGE_QUANTITY": {
        const idCartItem = Number(action.payload);
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === idCartItem
            ? { ...item, quantity: action.payload.quantity }
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
