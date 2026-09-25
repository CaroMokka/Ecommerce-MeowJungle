import { cartReducer } from "./cartReducer";
import { CartAction, CartState } from "./cartTypes";

const itemA = { id: 1, name: "Jabón", price: 3500, quantity: 2 };
const itemB = { id: 2, name: "Vela", price: 4200, quantity: 1 };

const state: CartState = { cart: [itemA, itemB] };

const addToCart = (item: { id: number; name?: string; price?: number }): CartAction => ({
  type: "ADD_TO_CART",
  payload: item,
});

describe("cartReducer", () => {
  it("ADD_TO_CART agrega un item nuevo con quantity 1 y preserva el resto", () => {
    const result = cartReducer(state, addToCart({ id: 3, name: "Aceite", price: 2800 }));
    expect(result.cart).toHaveLength(3);
    expect(result.cart[2]).toEqual({ id: 3, name: "Aceite", price: 2800, quantity: 1 });
    expect(result.cart[0]).toEqual(itemA);
    expect(result.cart[1]).toEqual(itemB);
  });

  it("ADD_TO_CART con item existente suma cantidades por id sin duplicar", () => {
    const result = cartReducer(state, addToCart({ id: 1, name: "Jabón", price: 3500 }));
    expect(result.cart).toHaveLength(2);
    expect(result.cart[0]).toEqual({ ...itemA, quantity: 3 });
    expect(result.cart[1]).toEqual(itemB);
  });

  it("REMOVE_FROM_CART elimina el item por id numérico", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: 1 });
    expect(result.cart).toEqual([itemB]);
  });

  it("REMOVE_FROM_CART acepta id como string", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: "2" });
    expect(result.cart).toEqual([itemA]);
  });

  it("REMOVE_FROM_CART con id inexistente devuelve el carrito sin cambios", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: 99 });
    expect(result.cart).toEqual(state.cart);
  });

  it("CHANGE_QUANTITY actualiza la cantidad del item existente", () => {
    const result = cartReducer(state, { type: "CHANGE_QUANTITY", payload: { id: 1, quantity: 5 } });
    expect(result.cart[0]).toEqual({ ...itemA, quantity: 5 });
    expect(result.cart[1]).toEqual(itemB);
  });

  it("CHANGE_QUANTITY acepta id como string", () => {
    const result = cartReducer(state, { type: "CHANGE_QUANTITY", payload: { id: "2", quantity: 4 } });
    expect(result.cart[1]).toEqual({ ...itemB, quantity: 4 });
  });

  it("CHANGE_QUANTITY con id inexistente devuelve el carrito sin cambios", () => {
    const result = cartReducer(state, { type: "CHANGE_QUANTITY", payload: { id: 99, quantity: 4 } });
    expect(result.cart).toEqual(state.cart);
  });

  it("CHANGE_QUANTITY nunca reduce la cantidad por debajo de 1", () => {
    const result = cartReducer(state, { type: "CHANGE_QUANTITY", payload: { id: 1, quantity: 0 } });
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