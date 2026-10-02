import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartProvider } from "./cartContext";
import useCart from "./useCart";
import type { CartState } from "./cartTypes";
import { createProductFixture } from "../../test/fixtures/productFixture";

const LOCAL_STORAGE_KEY = "cartItems";

const validItem = { productId: 1, quantity: 2 };
const secondItem = { productId: 2, quantity: 1 };

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
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [validItem] })
    );
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([validItem]);
  });

  it("descarta items sin shape mínimo y conserva los válidos", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        cart: [
          validItem,
          secondItem,
          { productId: 6 },
          { quantity: 2 },
          null,
        ],
      })
    );
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([validItem, secondItem]);
  });

  it("descarta carritos de la era del snapshot (sin productId)", () => {
    const legacyItem = {
      ...createProductFixture({ id: 1, name: "Jabón", price: 3500 }),
      quantity: 2,
    };
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [legacyItem, secondItem] })
    );
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([secondItem]);
  });

  it("no rompe la app cuando localStorage contiene JSON corrupto", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "{carrito: no-valido");
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([]);
  });

  it("no rompe la app cuando el valor almacenado no tiene la estructura esperada", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([validItem]));
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([]);
  });

  it("capita la cantidad al stock vigente del catálogo al hidratar", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [{ productId: 1, quantity: 99 }] })
    );
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([{ productId: 1, quantity: 50 }]);
    const stored = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
    ) as CartState;
    expect(stored.cart).toEqual([{ productId: 1, quantity: 50 }]);
  });

  it("descarta productIds que ya no existen en el catálogo al hidratar", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [{ productId: 123, quantity: 1 }] })
    );
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([]);
    const stored = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
    ) as CartState;
    expect(stored.cart).toEqual([]);
  });

  it("no toca un carrito ya válido y reconciliado", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ cart: [validItem] }));
    const { result } = renderCart();
    expect(result.current.state.cart).toEqual([validItem]);
    const stored = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
    ) as CartState;
    expect(stored.cart).toEqual([validItem]);
  });

  it("persiste en localStorage cada cambio de estado", () => {
    const { result } = renderCart();
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: 1 });
    });
    const stored = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
    ) as CartState;
    expect(stored.cart).toEqual([{ productId: 1, quantity: 1 }]);
    expect(result.current.state.cart).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it("actualiza localStorage en cada cambio posterior", () => {
    const { result } = renderCart();
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: 1 });
    });
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: 2 });
    });
    const stored = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
    ) as CartState;
    expect(stored.cart).toHaveLength(2);
    expect(stored.cart.map((item) => item.productId)).toEqual([1, 2]);
  });

  it("expone lines reconciliadas con el catálogo", () => {
    const { result } = renderCart();
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: 1 });
    });
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0]).toMatchObject({
      productId: 1,
      quantity: 1,
      product: { id: 1, name: "Esencia de Lavanda" },
    });
  });
});