import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import { CartProvider } from "../cart/cartContext";
import { CheckoutProvider } from "./checkoutContext";
import useCheckout from "./useCheckout";
import { resolveStep } from "./checkoutTypes";

const LOCAL_STORAGE_KEY = "cartItems";

function Harness({ initialEntry }: { initialEntry: string }) {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <CartProvider>
        <Routes>
          <Route
            path="/cart"
            element={
              <CheckoutProvider>
                <div>CART PAGE</div>
              </CheckoutProvider>
            }
          />
          <Route
            path="/checkout/profile"
            element={
              <CheckoutProvider>
                <div>PROFILE PAGE</div>
              </CheckoutProvider>
            }
          />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

describe("resolveStep", () => {
  it("mapea los caminos conocidos a su paso", () => {
    expect(resolveStep("/cart")).toBe("cart");
    expect(resolveStep("/checkout/profile")).toBe("profile");
    expect(resolveStep("/checkout/shipping")).toBe("shipping");
    expect(resolveStep("/checkout/payment")).toBe("payment");
    expect(resolveStep("/checkout/confirmation")).toBe("confirmation");
  });

  it("devuelve cart para caminos desconocidos", () => {
    expect(resolveStep("/desconocido")).toBe("cart");
    expect(resolveStep("/checkout/nope")).toBe("cart");
  });
});

describe("CheckoutProvider guard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirige a /cart cuando el carrito está vacío en un paso de checkout", () => {
    render(<Harness initialEntry="/checkout/profile" />);
    expect(screen.getByText("CART PAGE")).toBeInTheDocument();
  });

  it("no redirige cuando el carrito tiene productos", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [{ productId: 1, quantity: 1 }] })
    );
    render(<Harness initialEntry="/checkout/profile" />);
    expect(screen.getByText("PROFILE PAGE")).toBeInTheDocument();
  });

  it("no redirige el paso cart aunque el carrito esté vacío", () => {
    render(<Harness initialEntry="/cart" />);
    expect(screen.getByText("CART PAGE")).toBeInTheDocument();
  });
});

describe("useCheckout", () => {
  function StepProbe() {
    const { activeStep } = useCheckout();
    return <div>STEP:{activeStep}</div>;
  }

  function ProbeWrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={["/cart"]}>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </MemoryRouter>
    );
  }

  it("expone el paso activo derivado de la URL", () => {
    render(
      <ProbeWrapper>
        <StepProbe />
      </ProbeWrapper>
    );
    expect(screen.getByText("STEP:cart")).toBeInTheDocument();
  });

  it("lanza un error fuera del CheckoutProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    expect(() => render(<StepProbe />)).toThrow(/CheckoutProvider/);
    consoleError.mockRestore();
  });
});