import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

function ThrowingChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("boom");
  }
  return <p>Contenido recuperado</p>;
}

function Harness() {
  const [errorKey, setErrorKey] = useState(0);
  const [shouldThrow, setShouldThrow] = useState(true);

  return (
    <ErrorBoundary
      key={errorKey}
      onReset={() => {
        setShouldThrow(false);
        setErrorKey((key) => key + 1);
      }}
    >
      <ThrowingChild shouldThrow={shouldThrow} />
    </ErrorBoundary>
  );
}

describe("ErrorBoundary", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renderiza el contenido cuando no hay errores", () => {
    render(<ErrorBoundary>Contenido normal</ErrorBoundary>);

    expect(screen.getByText("Contenido normal")).toBeInTheDocument();
  });

  it("captura el error del hijo y muestra la pantalla de error", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(
        "Algo salió mal al mostrar esta página. Intentá recargarla."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reintentar" })).toBeInTheDocument();
  });

  it("el error capturado no muestra el crash del hijo", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.queryByText("boom")).not.toBeInTheDocument();
  });

  it("la acción de recuperación remonta el contenido protegido mediante key", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(
      screen.getByText(
        "Algo salió mal al mostrar esta página. Intentá recargarla."
      )
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(screen.getByText("Contenido recuperado")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Algo salió mal al mostrar esta página. Intentá recargarla."
      )
    ).not.toBeInTheDocument();
  });
});