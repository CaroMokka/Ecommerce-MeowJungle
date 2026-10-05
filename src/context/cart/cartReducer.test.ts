import { cartReducer } from "./cartReducer";
import { CartItem, CartState } from "./cartTypes";

const itemA: CartItem = { productId: 1, quantity: 2 };
const itemB: CartItem = { productId: 2, quantity: 1 };

const state: CartState = { cart: [itemA, itemB] };

describe("cartReducer", () => {
  it("ADD_TO_CART agrega un item nuevo con quantity 1 y preserva el resto", () => {
    const result = cartReducer(state, { type: "ADD_TO_CART", payload: { productId: 3 } });
    expect(result.cart).toHaveLength(3);
    expect(result.cart[2]).toEqual({ productId: 3, quantity: 1 });
    expect(result.cart[0]).toEqual(itemA);
    expect(result.cart[1]).toEqual(itemB);
  });

  it("ADD_TO_CART con item existente suma cantidades por productId sin duplicar", () => {
    const result = cartReducer(state, { type: "ADD_TO_CART", payload: { productId: 1 } });
    expect(result.cart).toHaveLength(2);
    expect(result.cart[0]).toEqual({ productId: 1, quantity: 3 });
    expect(result.cart[1]).toEqual(itemB);
  });

  it("ADD_TO_CART con NaN no agrega ningún item", () => {
    const result = cartReducer(state, { type: "ADD_TO_CART", payload: { productId: Number.NaN } });
    expect(result.cart).toEqual(state.cart);
  });

  it("REMOVE_FROM_CART elimina el item por productId", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: { productId: 1 } });
    expect(result.cart).toEqual([itemB]);
  });

  it("REMOVE_FROM_CART con productId inexistente devuelve el carrito sin cambios", () => {
    const result = cartReducer(state, { type: "REMOVE_FROM_CART", payload: { productId: 99 } });
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

  it("ADD_TO_CART mantiene separadas las variantes del mismo producto", () => {
    const conVariantes: CartState = {
      cart: [{ productId: 7, variantId: "vela-180g", quantity: 1 }],
    };

    const result = cartReducer(conVariantes, {
      type: "ADD_TO_CART",
      payload: { productId: 7, variantId: "vela-400g" },
    });

    expect(result.cart).toHaveLength(2);
    expect(result.cart[1]).toEqual({
      productId: 7,
      variantId: "vela-400g",
      quantity: 1,
    });
  });

  it("ADD_TO_CART suma cantidad solo a la variante repetida", () => {
    const conVariantes: CartState = {
      cart: [
        { productId: 7, variantId: "vela-180g", quantity: 1 },
        { productId: 7, variantId: "vela-400g", quantity: 4 },
      ],
    };

    const result = cartReducer(conVariantes, {
      type: "ADD_TO_CART",
      payload: { productId: 7, variantId: "vela-180g" },
    });

    expect(result.cart).toHaveLength(2);
    expect(result.cart[0].quantity).toBe(2);
    expect(result.cart[1].quantity).toBe(4);
  });

  it("REMOVE_FROM_CART elimina solo la variante indicada", () => {
    const conVariantes: CartState = {
      cart: [
        { productId: 7, variantId: "vela-180g", quantity: 1 },
        { productId: 7, variantId: "vela-400g", quantity: 2 },
      ],
    };

    const result = cartReducer(conVariantes, {
      type: "REMOVE_FROM_CART",
      payload: { productId: 7, variantId: "vela-180g" },
    });

    expect(result.cart).toEqual([
      { productId: 7, variantId: "vela-400g", quantity: 2 },
    ]);
  });

  it("REMOVE_FROM_CART sin variantId no toca las líneas con variante", () => {
    const conVariantes: CartState = {
      cart: [{ productId: 7, variantId: "vela-180g", quantity: 1 }],
    };

    const result = cartReducer(conVariantes, {
      type: "REMOVE_FROM_CART",
      payload: { productId: 7 },
    });

    expect(result.cart).toEqual(conVariantes.cart);
  });

  it("CHANGE_QUANTITY solo modifica la variante indicada", () => {
    const conVariantes: CartState = {
      cart: [
        { productId: 7, variantId: "vela-180g", quantity: 1 },
        { productId: 7, variantId: "vela-400g", quantity: 2 },
      ],
    };

    const result = cartReducer(conVariantes, {
      type: "CHANGE_QUANTITY",
      payload: { productId: 7, variantId: "vela-400g", quantity: 6 },
    });

    expect(result.cart[0].quantity).toBe(1);
    expect(result.cart[1].quantity).toBe(6);
  });
});