export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: number }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CHANGE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" }

