import { CartLine } from "../cart/cartLines";
import { calculateCartTotals } from "../cart/cartTotals";

export type Order = {
  id: string;
  createdAt: string;
  itemCount: number;
  subtotal: number;
  lines: CartLine[];
};

export const createOrder = (
  lines: CartLine[],
  id = `order-${Date.now()}`
): Order => {
  const { itemCount, subtotal } = calculateCartTotals(lines);
  return {
    id,
    createdAt: new Date().toISOString(),
    itemCount,
    subtotal,
    lines,
  };
};