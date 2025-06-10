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
  const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedCart: CartState = storedCart
  ? (JSON.parse(storedCart) as CartState)
  : initialState;
  const [state, dispatch] = useReducer(cartReducer, parsedCart);

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
