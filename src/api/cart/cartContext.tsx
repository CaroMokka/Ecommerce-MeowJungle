import { createContext, useReducer, ReactNode } from "react";
import { cartReducer } from "./cartReducer";
import { CartState, CartAction } from "./cartTypes";

const initialState: CartState = {
  cart: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => null });

export const CartProvider = ({ children }: { children: ReactNode })=> {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };

  export default CartContext


