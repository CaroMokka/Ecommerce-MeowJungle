import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BuyButton from "./BuyButton";
import { createProductFixture } from "../../../test/fixtures/productFixture";
import type {
  AnalyticsEvent,
  AnalyticsPayload,
} from "../../../services/analytics/analytics";

const mockDispatch = jest.fn();
const mockTrack = jest.fn<void, [AnalyticsEvent, AnalyticsPayload?]>();

jest.mock("../../../context/cart/useCart", () => ({
  __esModule: true,
  default: () => ({
    dispatch: mockDispatch,
  }),
}));

jest.mock("../../../services/analytics/analytics", () => ({
  __esModule: true,
  track: (event: AnalyticsEvent, payload?: AnalyticsPayload): void => {
    mockTrack(event, payload);
  },
}));

describe("BuyButton", () => {
  const testProduct = createProductFixture({
    id: 1,
    name: "Producto 1",
    price: 2999,
  });

  beforeEach(() => {
    mockDispatch.mockClear();
    mockTrack.mockClear();
  });

  it("se renderiza correctamente con el texto del botón", () => {
    render(<BuyButton product={testProduct} />);
    const boton = screen.getByRole("button", { name: /añadir al carrito/i });
    expect(boton).toBeInTheDocument();
  });

  it("llama a dispatch con acción ADD_TO_CART al hacer clic", async () => {
    const user = userEvent.setup();
    render(<BuyButton product={testProduct} />);
    const boton = screen.getByRole("button", { name: /añadir al carrito/i });

    await user.click(boton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: { productId: testProduct.id, variantId: undefined },
    });
  });

  it("emite el evento add_to_cart con el producto y su precio", async () => {
    const user = userEvent.setup();
    render(<BuyButton product={testProduct} />);
    const boton = screen.getByRole("button", { name: /añadir al carrito/i });

    await user.click(boton);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith("add_to_cart", {
      productId: testProduct.id,
      productName: testProduct.name,
      price: testProduct.price,
    });
  });

  it("agrega la variante seleccionada con su precio ajustado", async () => {
    const user = userEvent.setup();
    const productWithVariants = createProductFixture({
      id: 12,
      name: "Vela Aromática",
      price: 2499,
      variants: [
        { id: "vela-180g", name: "180 g", priceModifier: 0, stock: 40 },
        { id: "vela-400g", name: "400 g", priceModifier: 1500, stock: 25 },
      ],
    });
    render(<BuyButton product={productWithVariants} variantId="vela-400g" />);

    await user.click(screen.getByRole("button", { name: /añadir al carrito/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: { productId: 12, variantId: "vela-400g" },
    });
    expect(mockTrack).toHaveBeenCalledWith("add_to_cart", {
      productId: 12,
      productName: "Vela Aromática",
      price: 3999,
      variantId: "vela-400g",
    });
  });

  it("muestra Agotado y no permite comprar una variante sin stock", async () => {
    const user = userEvent.setup();
    render(<BuyButton product={testProduct} variantId="vela-400g" disabled />);

    const boton = screen.getByRole("button", { name: "Agotado" });
    await user.click(boton);

    expect(boton).toBeDisabled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
