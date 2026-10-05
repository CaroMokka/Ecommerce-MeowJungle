import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteButton from "./DeleteButton";
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

describe("DeleteButton", () => {
  const testProduct = createProductFixture({ id: 7, name: "Producto 7" });

  beforeEach(() => {
    mockDispatch.mockClear();
    mockTrack.mockClear();
  });

  it("elimina el producto del carrito al hacer clic", async () => {
    const user = userEvent.setup();
    render(<DeleteButton product={testProduct} />);

    await user.click(
      screen.getByRole("button", { name: /eliminar producto/i })
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_FROM_CART",
      payload: testProduct.id,
    });
  });

  it("emite el evento remove_from_cart con el producto eliminado", async () => {
    const user = userEvent.setup();
    render(<DeleteButton product={testProduct} />);

    await user.click(
      screen.getByRole("button", { name: /eliminar producto/i })
    );

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith("remove_from_cart", {
      productId: testProduct.id,
      productName: testProduct.name,
    });
  });
});
