import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";

jest.mock("../store/blocks/header/Header", () => {
  const MockHeader = () => <header>Header</header>;
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});
jest.mock("../store/blocks/footer/Footer", () => {
  const MockFooter = () => <footer>Footer</footer>;
  MockFooter.displayName = "MockFooter";
  return MockFooter;
});

const renderProductPage = (productId: string) =>
  render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <Routes>
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("ProductPage", () => {
  it("muestra el estado de producto inexistente con un enlace para volver", () => {
    renderProductPage("999");

    expect(
      screen.getByRole("heading", { name: "Producto no encontrado" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("El producto que buscas no existe o ya no está disponible.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Volver a productos" })
    ).toHaveAttribute("href", "/products");
  });
});