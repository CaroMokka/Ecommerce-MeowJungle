import { selectCartLines, CartLineInput } from "./cartLines";
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
});