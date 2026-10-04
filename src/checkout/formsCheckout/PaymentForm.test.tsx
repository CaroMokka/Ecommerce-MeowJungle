import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { PaymentMethodForm } from "./PaymentForm";
import { CheckoutProvider } from "../../context/checkout/checkoutContext";
import useCheckout from "../../context/checkout/useCheckout";

const mockDispatch = jest.fn();

jest.mock("../../../src/context/cart/useCart", () => ({
  __esModule: true,
  default: () => ({
    dispatch: mockDispatch,
    state: { cart: [{ productId: 1, quantity: 1 }] },
    lines: [{ productId: 1, quantity: 1 }],
  }),
}));

function LocationProbe() {
  const location = useLocation();
  return <div>{location.pathname}</div>;
}

function OrderProbe() {
  const { order } = useCheckout();
  return <div>ORDER:{order ? order.id : "none"}</div>;
}

function renderForm() {
  return render(
    <MemoryRouter initialEntries={["/checkout/payment"]}>
      <CheckoutProvider initialCompletedSteps={["profile", "shipping", "payment"]}>
        <PaymentMethodForm />
        <LocationProbe />
        <OrderProbe />
      </CheckoutProvider>
    </MemoryRouter>
  );
}

describe("PaymentMethodForm", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("tiene credit-card como método seleccionado por defecto", () => {
    renderForm();
    expect(screen.getByLabelText("Tarjeta de Crédito")).toBeChecked();
    expect(screen.getByLabelText("PayPal")).not.toBeChecked();
    expect(screen.getByLabelText("Transferencia Bancaria")).not.toBeChecked();
  });

  it("envía con la selección predeterminada credit-card, vacía el carrito y navega a confirmación", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(
      screen.getByRole("button", { name: "Confirmar método de pago" })
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_CART" });
    await screen.findByText(/\/checkout\/confirmation/);
    expect(await screen.findByText(/ORDER:order-\d+/)).toBeInTheDocument();
  });

  it("cambia de método con el radio y envía la nueva selección", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByLabelText("PayPal"));
    expect(screen.getByLabelText("Tarjeta de Crédito")).not.toBeChecked();
    expect(screen.getByLabelText("PayPal")).toBeChecked();

    await user.click(
      screen.getByRole("button", { name: "Confirmar método de pago" })
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_CART" });
    await screen.findByText(/\/checkout\/confirmation/);
    expect(await screen.findByText(/ORDER:order-\d+/)).toBeInTheDocument();
  });
});