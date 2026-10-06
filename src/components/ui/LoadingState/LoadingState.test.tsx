import { render, screen } from "@testing-library/react";
import LoadingState from "./LoadingState";

describe("LoadingState", () => {
  it("muestra el mensaje de carga por defecto", () => {
    render(<LoadingState />);

    expect(screen.getByRole("status")).toHaveTextContent("Cargando contenido…");
  });

  it("muestra un mensaje configurable", () => {
    render(<LoadingState message="Cargando catálogo…" />);

    expect(screen.getByRole("status")).toHaveTextContent("Cargando catálogo…");
  });
});