import { Product } from "../../types/Product";

export interface CartLineInput {
  productId: number;
  quantity: number;
}

export interface CartLine {
  productId: number;
  quantity: number;
  product: Product;
  lineTotal: number;
}

export function selectCartLines(
  cart: CartLineInput[],
  catalog: Product[]
): CartLine[] {
  const catalogById = new Map<number, Product>(
    catalog.map((product): [number, Product] => [product.id, product])
  );

  const merged = new Map<number, number>();
  for (const item of cart) {
    if (
      !Number.isInteger(item.productId) ||
      !Number.isFinite(item.quantity)
    ) {
      continue;
    }
    const quantity = Math.trunc(item.quantity);
    if (quantity <= 0) {
      continue;
    }
    merged.set(item.productId, (merged.get(item.productId) ?? 0) + quantity);
  }

  const lines: CartLine[] = [];
  for (const [productId, quantity] of merged) {
    const product = catalogById.get(productId);
    if (!product) {
      continue;
    }
    const cappedQuantity = Math.min(quantity, product.stock);
    if (cappedQuantity <= 0) {
      continue;
    }
    lines.push({
      productId,
      quantity: cappedQuantity,
      product,
      lineTotal: product.price * cappedQuantity,
    });
  }
  return lines;
}