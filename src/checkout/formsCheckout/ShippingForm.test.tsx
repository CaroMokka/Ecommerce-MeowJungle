import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import ShippingForm from "./ShippingForm";
import { CartProvider } from "../../context/cart/cartContext";
import { CheckoutProvider } from "../../context/checkout/checkoutContext";

const LOCAL_STORAGE_KEY = "cartItems";

function LocationProbe() {
  const location = useLocation();
  return <div>{location.pathname}</div>;
}

function renderForm() {
  return render(
    <MemoryRouter initialEntries={["/checkout/shipping"]}>
      <CartProvider>
        <CheckoutProvider initialCompletedSteps={["profile"]}>
          <ShippingForm />
          <LocationProbe />
        </CheckoutProvider>
      </CartProvider>
    </MemoryRouter>
  );
}

describe("ShippingForm", () => {
  beforeEach(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [{ productId: 1, quantity: 1 }] })
    );
  });

  it("muestra errores de campos requeridos al enviar vacío", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("El nombre completo es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("La dirección es obligatoria")).toBeInTheDocument();
    expect(await screen.findByText("La ciudad es obligatoria")).toBeInTheDocument();
    expect(await screen.findByText("El código postal es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("Por favor selecciona un país")).toBeInTheDocument();
  });

  it("rechaza un código postal que no tiene 5 dígitos", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByPlaceholderText("Ingresa tu nombre completo"), "Caro Mora");
    await user.type(screen.getByPlaceholderText("Ingresa tu dirección"), "Calle 123");
    await user.type(screen.getByPlaceholderText("Ingresa tu ciudad"), "Santiago");
    await user.type(screen.getByPlaceholderText("Ingresa tu código postal"), "1234");
    await user.selectOptions(screen.getByRole("combobox"), "CHL");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("Código postal no válido")).toBeInTheDocument();
  });

  it("acepta datos válidos, completa el paso y navega a /checkout/payment", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText("Ingresa tu nombre completo"), "Caro Mora");
    await user.type(screen.getByPlaceholderText("Ingresa tu dirección"), "Calle 123");
    await user.type(screen.getByPlaceholderText("Ingresa tu ciudad"), "Santiago");
    await user.type(screen.getByPlaceholderText("Ingresa tu código postal"), "12345");
    await user.selectOptions(screen.getByLabelText("País"), "CAN");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no válido/i)).not.toBeInTheDocument();
    expect(await screen.findByText("/checkout/payment")).toBeInTheDocument();
  });
});