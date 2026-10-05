import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { formatPrice } from "../../../utils/formatPrice";
import { createProductFixture } from "../../../test/fixtures/productFixture";

jest.mock("../../../context/cart/useCart", () => ({
  __esModule: true,
  default: () => ({ lines: [], dispatch: jest.fn() }),
}));

const productWithVariants = createProductFixture({
  id: 12,
  name: "Vela Aromática",
  price: 2499,
  image: "/img/vela.webp",
  alt: "Vela aromática natural",
  gallery: ["/img/vela.webp", "/img/vela-detalle.webp"],
  variants: [
    { id: "vela-180g", name: "180 g", priceModifier: 0, stock: 40 },
    { id: "vela-400g", name: "400 g", priceModifier: 1500, stock: 25 },
    { id: "vela-600g", name: "600 g", priceModifier: 3000, stock: 0 },
  ],
});

const renderDetail = () =>
  render(
    <MemoryRouter>
      <ProductDetail product={productWithVariants} />
    </MemoryRouter>
  );

describe("ProductDetail", () => {
  it("muestra galería, breadcrumb y selector de variantes", () => {
    renderDetail();

    expect(screen.getByRole("navigation", { name: "Migas de pan" })).toBeInTheDocument();
    expect(screen.getByAltText("Vela aromática natural")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("arranca con el precio de la primera variante", () => {
    renderDetail();

    expect(screen.getByText(formatPrice(2499))).toBeInTheDocument();
  });

  it("actualiza el precio al elegir otra variante", async () => {
    const user = userEvent.setup();
    renderDetail();

    await user.click(screen.getByRole("radio", { name: /400 g/ }));

    expect(screen.getByText(formatPrice(2499 + 1500))).toBeInTheDocument();
    expect(screen.queryByText(formatPrice(2499))).not.toBeInTheDocument();
  });

  it("bloquea la compra cuando la variante inicial está agotada", () => {
    const productSoldOut = createProductFixture({
      id: 13,
      name: "Aceite Esencial",
      price: 3999,
      variants: [
        { id: "aceite-10ml", name: "10 ml", priceModifier: 0, stock: 0 },
        { id: "aceite-30ml", name: "30 ml", priceModifier: 1200, stock: 12 },
      ],
    });
    render(
      <MemoryRouter>
        <ProductDetail product={productSoldOut} />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Agotado" })).toBeDisabled();
  });

  it("no muestra selector en productos sin variantes", () => {
    const product = createProductFixture({ id: 1, name: "Jabón", price: 1099 });
    render(
      <MemoryRouter>
        <ProductDetail product={product} />
      </MemoryRouter>
    );

    expect(screen.queryAllByRole("radio")).toHaveLength(0);
    expect(screen.getByText(formatPrice(1099))).toBeInTheDocument();
  });
});
