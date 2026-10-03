import { CartLine } from "./cartLines";

export type CartTotals = {
  itemCount: number;
  subtotal: number;
};

export const calculateCartTotals = (lines: CartLine[]): CartTotals => {
  const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0);
  const subtotal = lines.reduce((acc, line) => acc + line.lineTotal, 0);
  return { itemCount, subtotal };
};