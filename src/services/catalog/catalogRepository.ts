import { products } from "../../data/productSummaryData";
import { Product } from "../../types/Product";

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}