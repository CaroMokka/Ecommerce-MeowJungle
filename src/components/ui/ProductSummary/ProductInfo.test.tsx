import { render, screen } from "@testing-library/react";
import ProductInfo from "./ProductInfo";
import { CartLine } from "../../../services/cart/cartLines";
import { formatPrice } from "../../../utils/formatPrice";
import { createProductFixture } from "../../../test/fixtures/productFixture";

const mockLines: CartLine[] = [];

jest.mock("../../../context/cart/useCart", () => ({
  __esModule: true,
  default: () => ({ lines: mockLines, dispatch: jest.fn() }),
}));

const vela = createProductFixture({
  id: 12,
  name: "Vela Aromática",
  price: 2499,
  variants: [
    { id: "vela-180g", name: "180 g", priceModifier: 0, stock: 40 },
    { id: "vela-400g", name: "400 g", priceModifier: 1500, stock: 25 },
  ],
});

const lineVariant = (variantId: string, quantity: number): CartLine => {
  const unitPrice = variantId === "vela-400g" ? 3999 : 2499;
  return {
    lineKey: `12:${variantId}`,
    productId: 12,
    variantId,
    quantity,
    unitPrice,
    lineTotal: unitPrice * quantity,
    product: vela,
  };
};

describe("ProductInfo precio de la variante", () => {
  beforeEach(() => {
    mockLines.length = 0;
  });

  it("muestra el precio de la variante en el carrito, no el precio base", () => {
    mockLines.push(lineVariant("vela-400g", 1));
    render(<ProductInfo product={vela} variant="minicart" variantId="vela-400g" />);

    expect(screen.getByText(formatPrice(3999))).toBeInTheDocument();
    expect(screen.queryByText(formatPrice(2499))).not.toBeInTheDocument();
  });

  it("muestra el precio base cuando la línea no tiene variante", () => {
    const jabon = createProductFixture({ id: 1, name: "Jabón", price: 1099 });
    mockLines.push({
      lineKey: "1",
      productId: 1,
      quantity: 1,
      unitPrice: 1099,
      lineTotal: 1099,
      product: jabon,
    });
    render(<ProductInfo product={jabon} variant="minicart" />);

    expect(screen.getByText(formatPrice(1099))).toBeInTheDocument();
  });

  it("mantiene precio unitario de variante y subtotal coherentes", () => {
    mockLines.push(lineVariant("vela-400g", 3));
    render(<ProductInfo product={vela} variant="minicart" variantId="vela-400g" />);

    expect(screen.getByText(formatPrice(3999))).toBeInTheDocument();
    expect(screen.getByText(formatPrice(3999 * 3))).toBeInTheDocument();
  });

  it("usa el precio unitario recibido en el PDP por sobre el de la variante", () => {
    render(
      <ProductInfo product={vela} variant="pdp" variantId="vela-400g" unitPrice={3499} />
    );

    expect(screen.getByText(formatPrice(3499))).toBeInTheDocument();
  });

  it("muestra el nombre de la variante seleccionada en el carrito", () => {
    mockLines.push(lineVariant("vela-400g", 1));
    render(<ProductInfo product={vela} variant="minicart" variantId="vela-400g" />);

    expect(screen.getByText("400 g")).toBeInTheDocument();
  });
});
