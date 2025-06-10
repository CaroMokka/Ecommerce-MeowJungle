import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BuyButton from "./BuyButton";

const mockDispatch = jest.fn();

jest.mock("../../../api/cart/useCart", () => ({
  __esModule: true,
  default: () => ({
    dispatch: mockDispatch,
  }),
}));

describe("BuyButton", () => {
  const testProduct = { id: 1, name: "Producto 1" };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("se renderiza correctamente con el texto del botón", () => {
    render(<BuyButton product={testProduct} />);
    const boton = screen.getByRole("button", { name: /add to cart/i });
    expect(boton).toBeInTheDocument();
  });

  it("llama a dispatch con acción ADD_TO_CART al hacer clic", async () => {
    const user = userEvent.setup();
    render(<BuyButton product={testProduct} />);
    const boton = screen.getByRole("button", { name: /add to cart/i });

    await user.click(boton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: testProduct,
    });
  });
});
