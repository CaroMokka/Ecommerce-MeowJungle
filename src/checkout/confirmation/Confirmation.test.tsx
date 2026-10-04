import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Confirmation from "./Confirmation";
import { CartProvider } from "../../context/cart/cartContext";
import { CheckoutProvider } from "../../context/checkout/checkoutContext";
import { createOrder } from "../../services/order/order";
import { selectCartLines } from "../../services/cart/cartLines";
import { createProductFixture } from "../../test/fixtures/productFixture";
import { CheckoutStep } from "../../context/checkout/checkoutTypes";

const ORDER_KEY = "checkoutOrder";
const ALL_STEPS: CheckoutStep[] = ["profile", "shipping", "payment"];

const lines = selectCartLines(
  [{ productId: 1, quantity: 2 }],
  [createProductFixture({ id: 1, name: "Jabón", price: 3500 })]
);

function renderConfirmation() {
  return render(
    <MemoryRouter initialEntries={["/checkout/confirmation"]}>
      <CartProvider>
        <CheckoutProvider initialCompletedSteps={ALL_STEPS}>
          <Routes>
            <Route path="/checkout/confirmation" element={<Confirmation />} />
            <Route path="/cart" element={<div>CART FALLBACK</div>} />
          </Routes>
        </CheckoutProvider>
      </CartProvider>
    </MemoryRouter>
  );
}

describe("Confirmation", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("muestra el snapshot de la orden cuando existe", () => {
    sessionStorage.setItem(
      ORDER_KEY,
      JSON.stringify(createOrder(lines, "order-12345"))
    );
    renderConfirmation();

    expect(screen.getByText("Número de pedido simulado")).toBeInTheDocument();
    expect(screen.getByText("order-12345")).toBeInTheDocument();
    expect(screen.getByText(/Productos: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$7\.000/)).toBeInTheDocument();
    expect(screen.getByText("Jabón × 2")).toBeInTheDocument();
    expect(screen.getByText("$7.000")).toBeInTheDocument();
  });

  it("redirige a /cart cuando no existe una orden", () => {
    renderConfirmation();
    expect(screen.getByText("CART FALLBACK")).toBeInTheDocument();
  });
});