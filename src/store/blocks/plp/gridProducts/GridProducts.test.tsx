import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import GridProducts from "./GridProducts";
import { ProductFilterProvider } from "../../../../context/filterProducts/filterProductProvider";
import { useProductFilter } from "../../../../context/filterProducts/useFilterProduct";
import { CartProvider } from "../../../../context/cart/cartContext";
import type { Product } from "../../../../types/Product";

const products: Product[] = [
  { id: 1, name: "Jabón", price: 3500 },
  { id: 2, name: "Vela", price: 4200 },
];

function Seed({ items }: { items: Product[] }) {
  const { setFilteredProducts } = useProductFilter();
  useEffect(() => {
    setFilteredProducts(items);
  }, [items, setFilteredProducts]);
  return null;
}

function renderGrid(items: Product[]) {
  render(
    <CartProvider>
      <MemoryRouter>
        <ProductFilterProvider>
          <Seed items={items} />
          <GridProducts />
        </ProductFilterProvider>
      </MemoryRouter>
    </CartProvider>
  );
}

describe("GridProducts", () => {
  it("muestra el grid con los productos filtrados", () => {
    renderGrid(products);
    expect(screen.getByText("Jabón")).toBeInTheDocument();
    expect(screen.getByText("Vela")).toBeInTheDocument();
  });

  it("muestra el mensaje de vacío cuando no hay productos filtrados", () => {
    renderGrid([]);
    expect(
      screen.getByText("No se encontraron productos con los filtros seleccionados.")
    ).toBeInTheDocument();
    expect(screen.queryByText("Jabón")).not.toBeInTheDocument();
    expect(screen.queryByText("Vela")).not.toBeInTheDocument();
  });
});