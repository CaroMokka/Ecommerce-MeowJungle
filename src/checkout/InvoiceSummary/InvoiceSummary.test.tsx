import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InvoiceSummary from "./InvoiceSummary";

describe("InvoiceSummary", () => {
  it("no muestra la fila de descuentos hardcodeada", () => {
    render(
      <MemoryRouter>
        <InvoiceSummary totalItems={2} totalAmount={100} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Descuentos")).not.toBeInTheDocument();
    expect(screen.queryByText("$3.560")).not.toBeInTheDocument();
  });

  it("muestra cantidad de productos, subtotal y total consistentes", () => {
    render(
      <MemoryRouter>
        <InvoiceSummary totalItems={3} totalAmount={250} />
      </MemoryRouter>
    );

    expect(screen.getByText("Cantidad productos")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("SubTotal")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByText("$ 250")).toHaveLength(2);
  });

  it("incluye botón Ir a Pagar hacia /checkout/profile", () => {
    render(
      <MemoryRouter>
        <InvoiceSummary totalItems={1} totalAmount={50} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Ir a Pagar" });
    expect(link).toHaveAttribute("href", "/checkout/profile");
  });
});