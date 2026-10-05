import {
  selectCartLines,
  findVariant,
  getAvailableStock,
  getLineKey,
  getUnitPrice,
  CartLineInput,
} from "./cartLines";
import { createProductFixture } from "../../test/fixtures/productFixture";

const jabon = createProductFixture({ id: 1, name: "Jabón", price: 3500, stock: 5 });
const vela = createProductFixture({ id: 2, name: "Vela", price: 4200, stock: 10 });
const catalog = [jabon, vela];

describe("selectCartLines", () => {
  it("devuelve un array vacío para un carrito vacío", () => {
    expect(selectCartLines([], catalog)).toEqual([]);
  });

  it("devuelve un array vacío para un catálogo vacío", () => {
    const cart: CartLineInput[] = [{ productId: 1, quantity: 2 }];
    expect(selectCartLines(cart, [])).toEqual([]);
  });

  it("descarta items cuyo productId no existe en el catálogo", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: 2 },
      { productId: 99, quantity: 1 },
    ];
    expect(selectCartLines(cart, catalog)).toHaveLength(1);
    expect(selectCartLines(cart, catalog)[0].productId).toBe(1);
  });

  it("adopta el precio vigente del catálogo y calcula lineTotal", () => {
    const cart: CartLineInput[] = [{ productId: 1, quantity: 2 }];
    const result = selectCartLines(cart, catalog);
    expect(result).toHaveLength(1);
    expect(result[0].product).toEqual(jabon);
    expect(result[0].lineTotal).toBe(7000);
  });

  it("limita la cantidad al stock disponible del producto", () => {
    const cart: CartLineInput[] = [{ productId: 1, quantity: 99 }];
    const result = selectCartLines(cart, catalog);
    expect(result[0].quantity).toBe(5);
    expect(result[0].lineTotal).toBe(17500);
  });

  it("excluye items con quantity menor o igual a cero", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: 0 },
      { productId: 1, quantity: -3 },
      { productId: 2, quantity: 1 },
    ];
    expect(selectCartLines(cart, catalog)).toHaveLength(1);
    expect(selectCartLines(cart, catalog)[0].productId).toBe(2);
  });

  it("excluye items con quantity no finita (NaN o Infinity)", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: Number.NaN },
      { productId: 1, quantity: Number.POSITIVE_INFINITY },
      { productId: 2, quantity: 1 },
    ];
    expect(selectCartLines(cart, catalog)).toHaveLength(1);
  });

  it("trunca cantidades fraccionarias y descarta las que quedan en cero", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: 2.9 },
      { productId: 1, quantity: 0.4 },
    ];
    const result = selectCartLines(cart, catalog);
    expect(result[0].quantity).toBe(2);
  });

  it("excluye productos con stock cero", () => {
    const agotado = createProductFixture({ id: 3, name: "Agotado", price: 1000, stock: 0 });
    const cart: CartLineInput[] = [{ productId: 3, quantity: 1 }];
    expect(selectCartLines(cart, [agotado])).toEqual([]);
  });

  it("consolida items duplicados del mismo productId sumando cantidades", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: 2 },
      { productId: 1, quantity: 3 },
      { productId: 2, quantity: 1 },
    ];
    const result = selectCartLines(cart, catalog);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ productId: 1, quantity: 5, lineTotal: 17500 });
  });

  it("aplica el límite de stock después de consolidar duplicados", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: 3 },
      { productId: 1, quantity: 3 },
    ];
    const result = selectCartLines(cart, catalog);
    expect(result[0].quantity).toBe(5);
  });

  it("descarta items con productId no entero", () => {
    const cart: CartLineInput[] = [
      { productId: Number.NaN, quantity: 1 },
      { productId: 1.5, quantity: 1 },
      { productId: 2, quantity: 1 },
    ];
    expect(selectCartLines(cart, catalog)).toHaveLength(1);
    expect(selectCartLines(cart, catalog)[0].productId).toBe(2);
  });

  it("preserva el orden de primera aparición de cada item", () => {
    const cart: CartLineInput[] = [
      { productId: 2, quantity: 1 },
      { productId: 1, quantity: 1 },
    ];
    const result = selectCartLines(cart, catalog);
    expect(result.map((line) => line.productId)).toEqual([2, 1]);
  });

  it("no muta los inputs recibidos", () => {
    const cart: CartLineInput[] = [
      { productId: 1, quantity: 9 },
      { productId: 2, quantity: 1 },
    ];
    const cartSnapshot = JSON.stringify(cart);
    const catalogSnapshot = JSON.stringify(catalog);
    selectCartLines(cart, catalog);
    expect(JSON.stringify(cart)).toBe(cartSnapshot);
    expect(JSON.stringify(catalog)).toBe(catalogSnapshot);
  });

  describe("con variantes", () => {
    const vela = createProductFixture({
      id: 4,
      name: "Vela",
      price: 2499,
      stock: 10,
      variants: [
        { id: "vela-180g", name: "180 g", priceModifier: 0, stock: 8 },
        { id: "vela-400g", name: "400 g", priceModifier: 1500, stock: 2 },
      ],
    });
    const catalogoConVariantes = [vela];

    it("calcula el precio unitario con el modificador de la variante", () => {
      const result = selectCartLines(
        [{ productId: 4, variantId: "vela-400g", quantity: 2 }],
        catalogoConVariantes
      );

      expect(result[0].unitPrice).toBe(3999);
      expect(result[0].lineTotal).toBe(7998);
    });

    it("expone lineKey y variantId para identificar la línea", () => {
      const result = selectCartLines(
        [{ productId: 4, variantId: "vela-400g", quantity: 1 }],
        catalogoConVariantes
      );

      expect(result[0].lineKey).toBe("4:vela-400g");
      expect(result[0].variantId).toBe("vela-400g");
    });

    it("genera una línea distinta por cada variante del mismo producto", () => {
      const result = selectCartLines(
        [
          { productId: 4, variantId: "vela-180g", quantity: 1 },
          { productId: 4, variantId: "vela-400g", quantity: 1 },
        ],
        catalogoConVariantes
      );

      expect(result).toHaveLength(2);
      expect(result.map((line) => line.lineKey)).toEqual([
        "4:vela-180g",
        "4:vela-400g",
      ]);
    });

    it("limita la cantidad al stock de la variante, no al del producto", () => {
      const result = selectCartLines(
        [{ productId: 4, variantId: "vela-400g", quantity: 9 }],
        catalogoConVariantes
      );

      expect(result[0].quantity).toBe(2);
      expect(result[0].lineTotal).toBe(7998);
    });

    it("excluye la línea cuando la variante ya no existe en el catálogo", () => {
      const result = selectCartLines(
        [{ productId: 4, variantId: "vela-999g", quantity: 1 }],
        catalogoConVariantes
      );

      expect(result).toEqual([]);
    });

    it("consolida por variante sin mezclar cantidades de otra variante", () => {
      const result = selectCartLines(
        [
          { productId: 4, variantId: "vela-180g", quantity: 2 },
          { productId: 4, variantId: "vela-180g", quantity: 3 },
          { productId: 4, variantId: "vela-400g", quantity: 1 },
        ],
        catalogoConVariantes
      );

      expect(result).toHaveLength(2);
      expect(result[0].quantity).toBe(5);
      expect(result[1].quantity).toBe(1);
    });

    it("mantiene el precio base cuando la línea no tiene variantId", () => {
      const result = selectCartLines(
        [{ productId: 4, quantity: 1 }],
        catalogoConVariantes
      );

      expect(result[0].unitPrice).toBe(2499);
      expect(result[0].lineKey).toBe("4");
    });
  });

  describe("helpers de variante", () => {
    const producto = createProductFixture({
      id: 5,
      name: "Aceite",
      price: 3999,
      stock: 20,
      variants: [
        { id: "10ml", name: "10 ml", priceModifier: 0, stock: 6 },
        { id: "30ml", name: "30 ml", priceModifier: 1200, stock: 0 },
      ],
    });

    it("getUnitPrice suma el modificador de la variante indicada", () => {
      expect(getUnitPrice(producto, "30ml")).toBe(5199);
      expect(getUnitPrice(producto)).toBe(3999);
    });

    it("getAvailableStock usa el stock de la variante o el del producto", () => {
      expect(getAvailableStock(producto, "10ml")).toBe(6);
      expect(getAvailableStock(producto, "30ml")).toBe(0);
      expect(getAvailableStock(producto)).toBe(20);
    });

    it("getUnitPrice y getAvailableStock ignoran un variantId desconocido", () => {
      expect(getUnitPrice(producto, "no-existe")).toBe(3999);
      expect(getAvailableStock(producto, "no-existe")).toBe(20);
    });

    it("getLineKey compone productId y variantId", () => {
      expect(getLineKey({ productId: 5, variantId: "10ml" })).toBe("5:10ml");
      expect(getLineKey({ productId: 5 })).toBe("5");
    });

    it("findVariant devuelve la variante buscada o undefined", () => {
      expect(findVariant(producto, "10ml")).toEqual(producto.variants?.[0]);
      expect(findVariant(producto)).toBeUndefined();
      expect(findVariant(producto, "no-existe")).toBeUndefined();
    });
  });
});