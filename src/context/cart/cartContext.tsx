import { createContext, useReducer, ReactNode, useEffect } from "react";
import { cartReducer } from "./cartReducer";
import { CartState, CartAction } from "./cartTypes";

const initialState: CartState = {
  cart: [],
};
const LOCAL_STORAGE_KEY = "cartItems";

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => null });

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedCart) {
        return initialState;
      }
      const parsedCart = JSON.parse(storedCart) as CartState;
      if (!Array.isArray(parsedCart.cart)) {
        return initialState;
      }
      return {
        cart: parsedCart.cart.filter(
          (item) =>
            item &&
            (typeof item.id === "string" || typeof item.id === "number") &&
            typeof item.price === "number" &&
            typeof item.quantity === "number"
        ),
      };
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
