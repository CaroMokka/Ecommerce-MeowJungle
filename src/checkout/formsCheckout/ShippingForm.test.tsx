import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShippingForm from "./ShippingForm";

describe("ShippingForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("muestra errores de campos requeridos al enviar vacío", async () => {
    const user = userEvent.setup();
    render(<ShippingForm />);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("El nombre completo es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("La dirección es obligatoria")).toBeInTheDocument();
    expect(await screen.findByText("La ciudad es obligatoria")).toBeInTheDocument();
    expect(await screen.findByText("El código postal es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("Por favor selecciona un país")).toBeInTheDocument();
  });

  it("rechaza un código postal que no tiene 5 dígitos", async () => {
    const user = userEvent.setup();
    render(<ShippingForm />);
    await user.type(screen.getByPlaceholderText("Ingresa tu nombre completo"), "Caro Mora");
    await user.type(screen.getByPlaceholderText("Ingresa tu dirección"), "Calle 123");
    await user.type(screen.getByPlaceholderText("Ingresa tu ciudad"), "Santiago");
    await user.type(screen.getByPlaceholderText("Ingresa tu código postal"), "1234");
    await user.selectOptions(screen.getByRole("combobox"), "CHL");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("Código postal no válido")).toBeInTheDocument();
  });

  it("acepta datos válidos, ejecuta el onSubmit y resetea el formulario", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<ShippingForm />);

    const fullName = screen.getByPlaceholderText("Ingresa tu nombre completo");
    const address = screen.getByPlaceholderText("Ingresa tu dirección");
    const city = screen.getByPlaceholderText("Ingresa tu ciudad");
    const zip = screen.getByPlaceholderText("Ingresa tu código postal");

    await user.type(fullName, "Caro Mora");
    await user.type(address, "Calle 123");
    await user.type(city, "Santiago");
    await user.type(zip, "12345");
    await user.selectOptions(screen.getByRole("combobox"), "CAN");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no válido/i)).not.toBeInTheDocument();
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith("Shipping Info:", {
        fullName: "Caro Mora",
        address: "Calle 123",
        city: "Santiago",
        zipCode: "12345",
        country: "CAN",
      })
    );
    await waitFor(() => {
      expect(fullName).toHaveValue("");
      expect(zip).toHaveValue("");
    });
  });
});