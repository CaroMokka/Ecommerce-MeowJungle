import { getProducts, getProductById } from "./catalogRepository";
import { products } from "../../data/productSummaryData";
import { Product } from "../../types/Product";

describe("catalogRepository", () => {
  it("expone el catálogo completo a través de getProducts", () => {
    expect(getProducts()).toHaveLength(19);
    expect(getProducts()).toEqual(products);
  });

  it("getProductById devuelve el producto por id numérico", () => {
    const product = getProductById(1);
    expect(product?.name).toBe("Esencia de Lavanda");
  });

  it("getProductById devuelve undefined para un id inexistente", () => {
    expect(getProductById(999)).toBeUndefined();
  });

  it("garantiza ids únicos y de tipo numérico en todo el contrato", () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => Number.isInteger(id) && id > 0)).toBe(true);
  });

  it("garantiza precios en centavos (enteros positivos)", () => {
    expect(products.every((product) => Number.isInteger(product.price) && product.price > 0)).toBe(true);
  });

  it("cada producto declara todos los campos requeridos del contrato", () => {
    products.forEach((product: Product) => {
      expect(product.name.length).toBeGreaterThan(0);
      expect(typeof product.brand).toBe("string");
      expect(typeof product.description).toBe("string");
      expect(typeof product.image).toBe("string");
      expect(typeof product.alt).toBe("string");
      expect(typeof product.rating).toBe("number");
      expect(typeof product.reviews).toBe("number");
      expect(typeof product.department).toBe("string");
      expect(typeof product.category).toBe("string");
      expect(typeof product.stock).toBe("number");
      expect(Array.isArray(product.tags)).toBe(true);
      expect(product.dimensions.width.length).toBeGreaterThan(0);
      expect(Array.isArray(product.materials)).toBe(true);
      expect(typeof product.careInstructions).toBe("string");
      expect(product.shippingDetails.shippingCost).toBeGreaterThan(0);
    });
  });
});