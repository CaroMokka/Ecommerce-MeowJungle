import { calculateCartTotals } from "./cartTotals";
import { selectCartLines, CartLineInput, CartLine } from "./cartLines";
import { createProductFixture } from "../../test/fixtures/productFixture";

const jabon = createProductFixture({ id: 1, name: "Jabón", price: 3500, stock: 5 });
const vela = createProductFixture({ id: 2, name: "Vela", price: 4200, stock: 10 });
const catalog = [jabon, vela];

const toLines = (input: CartLineInput[]): CartLine[] =>
  selectCartLines(input, catalog);

describe("calculateCartTotals", () => {
  it("devuelve ceros para un carrito vacío", () => {
    expect(calculateCartTotals([])).toEqual({ itemCount: 0, subtotal: 0 });
  });

  it("calcula itemCount y subtotal de una sola línea", () => {
    const lines = toLines([{ productId: 1, quantity: 2 }]);
    expect(calculateCartTotals(lines)).toEqual({
      itemCount: 2,
      subtotal: 7000,
    });
  });

  it("suma itemCount y subtotal de varias líneas", () => {
    const lines = toLines([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ]);
    expect(calculateCartTotals(lines)).toEqual({
      itemCount: 3,
      subtotal: 11200,
    });
  });

  it("respeta el cap de stock del selector en itemCount y subtotal", () => {
    const lines = toLines([{ productId: 1, quantity: 99 }]);
    expect(calculateCartTotals(lines)).toEqual({
      itemCount: 5,
      subtotal: 17500,
    });
  });

  it("no muta las líneas recibidas", () => {
    const lines = toLines([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ]);
    const snapshot = JSON.stringify(lines);
    calculateCartTotals(lines);
    expect(JSON.stringify(lines)).toBe(snapshot);
  });
});