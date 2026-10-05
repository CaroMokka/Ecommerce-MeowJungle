import { Product, ProductVariant } from "../../types/Product";

export interface LineKeyInput {
  productId: number;
  variantId?: string;
}

export const getLineKey = ({ productId, variantId }: LineKeyInput): string =>
  variantId ? `${productId}:${variantId}` : String(productId);

export const findVariant = (
  product: Product,
  variantId?: string
): ProductVariant | undefined =>
  variantId
    ? product.variants?.find((variant) => variant.id === variantId)
    : undefined;

export const getUnitPrice = (product: Product, variantId?: string): number =>
  product.price + (findVariant(product, variantId)?.priceModifier ?? 0);

export const getAvailableStock = (
  product: Product,
  variantId?: string
): number => {
  const variant = findVariant(product, variantId);
  return variant ? variant.stock : product.stock;
};

export interface CartLineInput {
  productId: number;
  variantId?: string;
  quantity: number;
}

export interface CartLine {
  lineKey: string;
  productId: number;
  variantId?: string;
  quantity: number;
  product: Product;
  unitPrice: number;
  lineTotal: number;
}

export function selectCartLines(
  cart: CartLineInput[],
  catalog: Product[]
): CartLine[] {
  const catalogById = new Map<number, Product>(
    catalog.map((product): [number, Product] => [product.id, product])
  );

  const merged = new Map<
    string,
    { productId: number; variantId?: string; quantity: number }
  >();
  for (const item of cart) {
    if (!Number.isInteger(item.productId) || !Number.isFinite(item.quantity)) {
      continue;
    }
    if (item.variantId !== undefined && typeof item.variantId !== "string") {
      continue;
    }
    const quantity = Math.trunc(item.quantity);
    if (quantity <= 0) {
      continue;
    }
    const lineKey = getLineKey(item);
    const existing = merged.get(lineKey);
    merged.set(lineKey, {
      productId: item.productId,
      variantId: item.variantId,
      quantity: (existing?.quantity ?? 0) + quantity,
    });
  }

  const lines: CartLine[] = [];
  for (const [lineKey, { productId, variantId, quantity }] of merged) {
    const product = catalogById.get(productId);
    if (!product) {
      continue;
    }
    if (variantId !== undefined && !findVariant(product, variantId)) {
      continue;
    }
    const cappedQuantity = Math.min(quantity, getAvailableStock(product, variantId));
    if (cappedQuantity <= 0) {
      continue;
    }
    const unitPrice = getUnitPrice(product, variantId);
    lines.push({
      lineKey,
      productId,
      variantId,
      quantity: cappedQuantity,
      product,
      unitPrice,
      lineTotal: unitPrice * cappedQuantity,
    });
  }
  return lines;
}
