import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Confirmation from "./Confirmation";

function renderConfirmation(entry: object | string) {
  return render(
    <MemoryRouter initialEntries={[entry as never]}>
      <Routes>
        <Route path="/checkout/confirmation" element={<Confirmation />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Confirmation", () => {
  it("muestra el número de pedido simulado recibido por estado", () => {
    renderConfirmation({
      pathname: "/checkout/confirmation",
      state: { orderId: "order-12345" },
    });

    expect(screen.getByText("Número de pedido simulado")).toBeInTheDocument();
    expect(screen.getByText("order-12345")).toBeInTheDocument();
  });

  it("genera un número simulado cuando no hay estado previo", () => {
    renderConfirmation("/checkout/confirmation");

    expect(screen.getByText("Número de pedido simulado")).toBeInTheDocument();
    expect(screen.getByText(/^order-\d+$/)).toBeInTheDocument();
  });
});