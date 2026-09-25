import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartProvider } from "./cartContext";
import useCart from "./useCart";
import type { CartState } from "./cartTypes";

const LOCAL_STORAGE_KEY = "cartItems";
const validItem = { id: 1, name: "Jabón", price: 3500, quantity: 2 };

function renderCart() {
  return renderHook(() => useCart(), {
    wrapper: ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>,
  });
}

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicializa con carrito vacío cuando localStorage no tiene datos", () => {
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([]);
  });

  it("inicializa desde localStorage con datos válidos", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ cart: [validItem] }));
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([validItem]);
  });

  it("no rompe la app cuando localStorage contiene JSON corrupto y usa fallback", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "{carrito: no-valido");
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([]);
  });

  it("no rompe la app cuando el valor almacenado no tiene la estructura esperada", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([validItem]));
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([]);
  });

  it("persiste en localStorage cada cambio de estado", () => {
    const { result } = renderCart();
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: { id: 1, name: "Jabón", price: 3500 } });
    });
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}") as CartState;
    expect(stored.cart).toEqual([{ id: 1, name: "Jabón", price: 3500, quantity: 1 }]);
    expect(result.current.state.cart).toEqual([{ id: 1, name: "Jabón", price: 3500, quantity: 1 }]);
  });

  it("actualiza localStorage en cada cambio posterior", () => {
    const { result } = renderCart();
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: { id: 1, name: "Jabón", price: 3500 } });
    });
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: { id: 2, name: "Vela", price: 4200 } });
    });
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}") as CartState;
    expect(stored.cart).toHaveLength(2);
    expect(stored.cart.map((item) => item.id)).toEqual([1, 2]);
  });
});