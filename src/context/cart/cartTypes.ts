export interface CartItem {
  productId: number;
  variantId?: string;
  quantity: number;
}

export interface CartItemKey {
  productId: number;
  variantId?: string;
}

export interface CartState {
  cart: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItemKey }
  | { type: "REMOVE_FROM_CART"; payload: CartItemKey }
  | { type: "CHANGE_QUANTITY"; payload: CartItemKey & { quantity: number } }
  | { type: "CLEAR_CART" }
