import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductQuantity from "./ProductQuantity";

const mockDispatch = jest.fn();

jest.mock("../../../context/cart/useCart", () => ({
  __esModule: true,
  default: () => ({
    dispatch: mockDispatch,
  }),
}));

describe("ProductQuantity", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renderiza la cantidad recibida por prop", () => {
    render(<ProductQuantity productId={7} quantity={3} />);
    const total = screen.getByText("3");
    expect(total).toBeInTheDocument();
  });

  it("deshabilita el botón de restar cuando la cantidad es 1", () => {
    render(<ProductQuantity productId={7} quantity={1} />);
    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
  });

  it("dispara CHANGE_QUANTITY sumando 1 al hacer clic en +", async () => {
    render(<ProductQuantity productId={7} quantity={2} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "CHANGE_QUANTITY",
      payload: { productId: 7, quantity: 3 },
    });
  });

  it("dispara CHANGE_QUANTITY restando 1 al hacer clic en -", async () => {
    render(<ProductQuantity productId={7} quantity={4} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "CHANGE_QUANTITY",
      payload: { productId: 7, quantity: 3 },
    });
  });
});