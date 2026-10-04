import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import { CartProvider } from "../cart/cartContext";
import { CheckoutProvider } from "./checkoutContext";
import useCheckout from "./useCheckout";
import { CheckoutStep, resolveStep } from "./checkoutTypes";

const LOCAL_STORAGE_KEY = "cartItems";
const CART_WITH_ITEM = JSON.stringify({
  cart: [{ productId: 1, quantity: 1 }],
});

const ROUTES: Record<CheckoutStep, { path: string; label: string }> = {
  cart: { path: "/cart", label: "CART PAGE" },
  profile: { path: "/checkout/profile", label: "PROFILE PAGE" },
  shipping: { path: "/checkout/shipping", label: "SHIPPING PAGE" },
  payment: { path: "/checkout/payment", label: "PAYMENT PAGE" },
  confirmation: {
    path: "/checkout/confirmation",
    label: "CONFIRMATION PAGE",
  },
};

function Harness({
  initialEntry,
  initialCompletedSteps = [],
}: {
  initialEntry: string;
  initialCompletedSteps?: CheckoutStep[];
}) {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <CartProvider>
        <Routes>
          {(Object.keys(ROUTES) as CheckoutStep[]).map((step) => (
            <Route
              key={ROUTES[step].path}
              path={ROUTES[step].path}
              element={
                <CheckoutProvider initialCompletedSteps={initialCompletedSteps}>
                  <div>{ROUTES[step].label}</div>
                </CheckoutProvider>
              }
            />
          ))}
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

describe("CheckoutProvider guard de carrito vacío", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirige a /cart cuando el carrito está vacío en un paso de checkout", () => {
    render(<Harness initialEntry="/checkout/profile" />);
    expect(screen.getByText("CART PAGE")).toBeInTheDocument();
  });

  it("no redirige cuando el carrito tiene productos", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, CART_WITH_ITEM);
    render(<Harness initialEntry="/checkout/profile" />);
    expect(screen.getByText("PROFILE PAGE")).toBeInTheDocument();
  });

  it("no redirige el paso cart aunque el carrito esté vacío", () => {
    render(<Harness initialEntry="/cart" />);
    expect(screen.getByText("CART PAGE")).toBeInTheDocument();
  });
});

describe("CheckoutProvider guard de orden de pasos", () => {
  beforeEach(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, CART_WITH_ITEM);
  });

  it("rechaza shipping sin completar profile", () => {
    render(<Harness initialEntry="/checkout/shipping" />);
    expect(screen.getByText("PROFILE PAGE")).toBeInTheDocument();
  });

  it("rechaza payment sin completar profile", () => {
    render(<Harness initialEntry="/checkout/payment" />);
    expect(screen.getByText("PROFILE PAGE")).toBeInTheDocument();
  });

  it("rechaza confirmation sin completar los pasos previos", () => {
    render(<Harness initialEntry="/checkout/confirmation" />);
    expect(screen.getByText("PROFILE PAGE")).toBeInTheDocument();
  });

  it("permite shipping cuando profile está completo", () => {
    render(
      <Harness
        initialEntry="/checkout/shipping"
        initialCompletedSteps={["profile"]}
      />
    );
    expect(screen.getByText("SHIPPING PAGE")).toBeInTheDocument();
  });

  it("permite payment cuando profile y shipping están completos", () => {
    render(
      <Harness
        initialEntry="/checkout/payment"
        initialCompletedSteps={["profile", "shipping"]}
      />
    );
    expect(screen.getByText("PAYMENT PAGE")).toBeInTheDocument();
  });

  it("permite confirmation cuando todos los pasos previos están completos", () => {
    render(
      <Harness
        initialEntry="/checkout/confirmation"
        initialCompletedSteps={["profile", "shipping", "payment"]}
      />
    );
    expect(screen.getByText("CONFIRMATION PAGE")).toBeInTheDocument();
  });
});

describe("useCheckout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function CompleteProbe({ step }: { step: CheckoutStep }) {
    const { activeStep, completedSteps, completeStep } = useCheckout();
    return (
      <div>
        <span>STEP:{activeStep};DONE:{completedSteps.join(",") || "none"}</span>
        <button onClick={() => completeStep(step)}>complete</button>
      </div>
    );
  }

  function ActiveStepProbe() {
    const { activeStep } = useCheckout();
    return <div>ACTIVE:{activeStep}</div>;
  }

  function ProbeWrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={["/checkout/profile"]}>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </MemoryRouter>
    );
  }

  it("expone el paso activo derivado de la URL", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, CART_WITH_ITEM);
    render(
      <ProbeWrapper>
        <ActiveStepProbe />
      </ProbeWrapper>
    );
    expect(screen.getByText("ACTIVE:profile")).toBeInTheDocument();
  });

  it("marca un paso como completado con completeStep", async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, CART_WITH_ITEM);
    render(
      <ProbeWrapper>
        <CompleteProbe step="profile" />
      </ProbeWrapper>
    );
    await userEvent.click(screen.getByRole("button", { name: "complete" }));
    expect(
      screen.getByText("STEP:profile;DONE:profile")
    ).toBeInTheDocument();
  });

  it("lanza un error fuera del CheckoutProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    function StepErrorProbe() {
      const context = useCheckout();
      return <div>{context.activeStep}</div>;
    }
    expect(() => render(<StepErrorProbe />)).toThrow(/CheckoutProvider/);
    consoleError.mockRestore();
  });
});