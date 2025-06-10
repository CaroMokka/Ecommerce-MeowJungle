import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteButton from "./DeleteButton";

const mockDispatch = jest.fn();

jest.mock("../../../api/cart/useCart", () => ({
  __esModule: true,
  default: () => ({
    dispatch: mockDispatch,
  }),
}));

describe("DeleteButton", () => {
  const mockProduct = {
    id: 7,
    name: "Macetero de barro",
    brand: "Raíz Tierra",
    price: 20,
    tags: ["cerámica", "artesanal"],
    description: "Ideal para tus plantas pequeñas.",
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("dispara REMOVE_FROM_CART con el id del producto al hacer clic", async () => {
    render(<DeleteButton product={mockProduct} />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /eliminar producto/i });
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_FROM_CART",
      payload: String(mockProduct.id),
    });
  });
});
