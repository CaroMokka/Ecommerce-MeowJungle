import { createOrder } from "./order";
import { selectCartLines } from "../cart/cartLines";
import { createProductFixture } from "../../test/fixtures/productFixture";

const jabon = createProductFixture({ id: 1, name: "Jabón", price: 3500, stock: 5 });
const vela = createProductFixture({ id: 2, name: "Vela", price: 4200, stock: 10 });

const lines = selectCartLines(
  [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
  [jabon, vela]
);

describe("createOrder", () => {
  it("crea una orden con id y fecha por defecto", () => {
    const order = createOrder(lines);
    expect(order.id).toMatch(/^order-\d+$/);
    expect(order.createdAt).toEqual(expect.any(String));
  });

  it("acepta un id propio", () => {
    expect(createOrder(lines, "order-own").id).toBe("order-own");
  });

  it("snapshot: conserva las líneas con el precio vigente", () => {
    const order = createOrder(lines);
    expect(order.lines).toEqual(lines);
    expect(order.lines[0].lineTotal).toBe(7000);
  });

  it("calcula itemCount y subtotal con calculateCartTotals", () => {
    const order = createOrder(lines);
    expect(order.itemCount).toBe(3);
    expect(order.subtotal).toBe(11200);
  });
});