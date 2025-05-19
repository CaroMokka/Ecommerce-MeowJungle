import { useState } from "react";
import { Product } from "../types/Product"


interface CartItem {
    product: Product;
    quantity: number;
}
function useAddToCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
            item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    });
  };

  return { cart, addToCart }
}
export default useAddToCart;
