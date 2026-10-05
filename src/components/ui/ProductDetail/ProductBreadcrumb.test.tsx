import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductBreadcrumb from "./ProductBreadcrumb";
import { createProductFixture } from "../../../test/fixtures/productFixture";

describe("ProductBreadcrumb", () => {
  it("muestra la ruta de navegación hasta el producto", () => {
    const product = createProductFixture({
      id: 12,
      name: "Vela Aromática de Cedro & Vainilla",
      department: "Hogar",
    });
    render(
      <MemoryRouter>
        <ProductBreadcrumb product={product} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Hogar" })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(
      screen.getByText("Vela Aromática de Cedro & Vainilla")
    ).toBeInTheDocument();
  });

  it("marca el nombre del producto como la página actual", () => {
    const product = createProductFixture({ id: 12, name: "Vela Aromática" });
    render(
      <MemoryRouter>
        <ProductBreadcrumb product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText("Vela Aromática")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
