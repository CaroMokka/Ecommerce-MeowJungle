import { cartReducer } from "./cartReducer";
import { CartItem, CartState } from "./cartTypes";

const itemA: CartItem = { productId: 1, quantity: 2 };
const itemB: CartItem = { productId: 2, quantity: 1 };

const state: CartState = { cart: [itemA, itemB] };

describe("cartReducer", () => {
  it("ADD_TO_CART agrega un item nuevo con quantity 1 y preserva el resto", () => {
    const result = cartReducer(state, { type: "ADD_TO_CART", payload: 3 });
    expect(result.cart).toHaveLength(3);
    expect(result.cart[2]).toEqual({ productId: 3, quantity: 1 });
    expect(result.cart[0]).toEqual(itemA);
    expect(result.cart[1]).toEqual(itemB);
  });

  it("ADD_TO_CART con item existente suma cantidades por productId sin duplicar", () => {
    const result = cartReducer(state, { type: "ADD_TO_CART", payload: 1 });
    expect(result.cart).toHaveLength(2);
    expect(result.cart[0]).toEqual({ productId: 1, quantity: 3 });
    expect(result.cart[1]).toEqual(itemB);
  });

  it("ADD_TO_CART con NaN no agrega ningún item", () => {
    const result = cartReducer(state, { type: "ADD_TO_CART", payload: Number.NaN });
    expect(result.cart).toEqual(state.cart);
  });

  it("REMOVE_FROM_CART elimina el item por productId", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: 1 });
    expect(result.cart).toEqual([itemB]);
  });

  it("REMOVE_FROM_CART con productId inexistente devuelve el carrito sin cambios", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: 99 });
    expect(result.cart).toEqual(state.cart);
  });

  it("CHANGE_QUANTITY actualiza la cantidad del item existente", () => {
    const result = cartReducer(state, {
      type: "CHANGE_QUANTITY",
      payload: { productId: 1, quantity: 5 },
    });
    expect(result.cart[0]).toEqual({ productId: 1, quantity: 5 });
    expect(result.cart[1]).toEqual(itemB);
  });

  it("CHANGE_QUANTITY con productId inexistente devuelve el carrito sin cambios", () => {
    const result = cartReducer(state, {
      type: "CHANGE_QUANTITY",
      payload: { productId: 99, quantity: 4 },
    });
    expect(result.cart).toEqual(state.cart);
  });

  it("CHANGE_QUANTITY nunca reduce la cantidad por debajo de 1", () => {
    const result = cartReducer(state, {
      type: "CHANGE_QUANTITY",
      payload: { productId: 1, quantity: 0 },
    });
    expect(result.cart[0].quantity).toBe(1);
  });

  it("CLEAR_CART vacía el carrito", () => {
    const result = cartReducer(state, { type: "CLEAR_CART" });
    expect(result).toEqual({ cart: [] });
  });

  it("default devuelve el estado sin modificaciones", () => {
    const result = cartReducer(state, { type: "UNKNOWN_ACTION" } as never);
    expect(result).toBe(state);
  });
});