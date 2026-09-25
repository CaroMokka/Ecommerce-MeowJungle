import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaymentMethodForm } from "./PaymentForm";

describe("PaymentMethodForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("tiene credit-card como método seleccionado por defecto", () => {
    render(<PaymentMethodForm />);
    expect(screen.getByLabelText("Tarjeta de Crédito")).toBeChecked();
    expect(screen.getByLabelText("PayPal")).not.toBeChecked();
    expect(screen.getByLabelText("Transferencia Bancaria")).not.toBeChecked();
  });

  it("envía con la selección predeterminada credit-card al hacer submit", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<PaymentMethodForm />);

    await user.click(screen.getByRole("button", { name: "Confirmar método de pago" }));

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        "Método de pago seleccionado:",
        "credit-card"
      )
    );
  });

  it("cambia de método con el radio y envía la nueva selección", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<PaymentMethodForm />);

    await user.click(screen.getByLabelText("PayPal"));
    expect(screen.getByLabelText("Tarjeta de Crédito")).not.toBeChecked();
    expect(screen.getByLabelText("PayPal")).toBeChecked();

    await user.click(screen.getByRole("button", { name: "Confirmar método de pago" }));

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        "Método de pago seleccionado:",
        "paypal"
      )
    );
  });
});