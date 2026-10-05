import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { cartReducer } from "./cartReducer";
import { CartState, CartAction, CartItem } from "./cartTypes";
import { CartLine, selectCartLines } from "../../services/cart/cartLines";
import { getProducts } from "../../services/catalog/catalogRepository";

const initialState: CartState = {
  cart: [],
};
const LOCAL_STORAGE_KEY = "cartItems";

const CartContext = createContext<{
  state: CartState;
  lines: CartLine[];
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, lines: [], dispatch: () => null });

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
      const rawCart = parsedCart.cart.filter(
        (item): item is CartItem =>
          item &&
          typeof item.productId === "number" &&
          typeof item.quantity === "number" &&
          (item.variantId === undefined || typeof item.variantId === "string")
      );
      const cleanCart = selectCartLines(rawCart, getProducts()).map(
        ({ productId, variantId, quantity }) => ({ productId, variantId, quantity })
      );
      return { cart: cleanCart };
    } catch {
      return initialState;
    }
  });

  const lines = useMemo(
    () => selectCartLines(state.cart, getProducts()),
    [state.cart]
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, lines, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
