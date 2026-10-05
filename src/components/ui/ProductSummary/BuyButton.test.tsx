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
      payload: testProduct.id,
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
});
