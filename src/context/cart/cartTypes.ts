import { Product } from "../../types/Product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string | number }
  | { type: "CHANGE_QUANTITY"; payload: { id: string | number; quantity: number } } 
  | { type: "CLEAR_CART" }

