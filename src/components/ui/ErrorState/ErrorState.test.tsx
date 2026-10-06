import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("muestra el mensaje de error por defecto", () => {
    render(<ErrorState />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ocurrió un problema inesperado. Intentá de nuevo."
    );
  });

  it("muestra un mensaje configurable", () => {
    render(<ErrorState message="No se pudieron cargar los productos." />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "No se pudieron cargar los productos."
    );
  });

  it("no muestra la acción de reintento cuando no recibe onRetry", () => {
    render(<ErrorState />);

    expect(
      screen.queryByRole("button", { name: "Reintentar" })
    ).not.toBeInTheDocument();
  });

  it("ejecuta el callback al usar la acción de reintento", async () => {
    const onRetry = jest.fn();
    const user = userEvent.setup();
    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});