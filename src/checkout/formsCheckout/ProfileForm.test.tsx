import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileForm } from "./ProfileForm";

describe("ProfileForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("muestra errores de campos requeridos al enviar vacío", async () => {
    const user = userEvent.setup();
    render(<ProfileForm />);
    await user.click(screen.getByRole("button", { name: "Guardar Perfil" }));

    expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("El apellido es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("El email es obligatorio")).toBeInTheDocument();
  });

  it("muestra mensaje de formato cuando el email es inválido", async () => {
    const user = userEvent.setup();
    render(<ProfileForm />);
    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "Caro");
    await user.type(inputs[1], "Aguirre");
    await user.type(inputs[2], "email-no-valido");
    await user.click(screen.getByRole("button", { name: "Guardar Perfil" }));

    expect(await screen.findByText("El formato del email no es válido")).toBeInTheDocument();
    expect(screen.queryByText("El nombre es obligatorio")).not.toBeInTheDocument();
  });

  it("con datos válidos no muestra errores y ejecuta el onSubmit", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<ProfileForm />);

    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "Caro");
    await user.type(inputs[1], "Aguirre");
    await user.type(inputs[2], "caro@example.com");
    await user.click(screen.getByRole("button", { name: "Guardar Perfil" }));

    expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no es válido/i)).not.toBeInTheDocument();
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith("object", {
        name: "Caro",
        lastName: "Aguirre",
        email: "caro@example.com",
      })
    );
    expect(alertSpy).toHaveBeenCalledWith("Perfil enviado correctamente ✅");
  });
});