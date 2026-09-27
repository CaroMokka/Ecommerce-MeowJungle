import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartProvider } from "./cartContext";
import useCart from "./useCart";
import type { CartState } from "./cartTypes";
import { createProductFixture } from "../../test/fixtures/productFixture";

const LOCAL_STORAGE_KEY = "cartItems";
const jabon = createProductFixture({ id: "jabon", name: "Jabón", price: 3500 });
const vela = createProductFixture({ id: "vela", name: "Vela", price: 4200 });
const validItem = { ...jabon, quantity: 2 };

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

  it("descarta items sin shape mínimo (id/price/quantity) al inicializar desde localStorage", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [validItem, { id: "roto", price: "abc" }, { id: 5, price: 100, quantity: 2 }] })
    );
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
      result.current.dispatch({ type: "ADD_TO_CART", payload: jabon });
    });
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}") as CartState;
    expect(stored.cart).toEqual([{ ...jabon, quantity: 1 }]);
    expect(result.current.state.cart).toEqual([{ ...jabon, quantity: 1 }]);
  });

  it("actualiza localStorage en cada cambio posterior", () => {
    const { result } = renderCart();
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: jabon });
    });
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: vela });
    });
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}") as CartState;
    expect(stored.cart).toHaveLength(2);
    expect(stored.cart.map((item) => item.id)).toEqual(["jabon", "vela"]);
  });
});