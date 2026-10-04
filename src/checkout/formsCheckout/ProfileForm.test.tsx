import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { ProfileForm } from "./ProfileForm";
import { CartProvider } from "../../context/cart/cartContext";
import { CheckoutProvider } from "../../context/checkout/checkoutContext";

const LOCAL_STORAGE_KEY = "cartItems";

function LocationProbe() {
  const location = useLocation();
  return <div>{location.pathname}</div>;
}

function renderForm() {
  return render(
    <MemoryRouter initialEntries={["/checkout/profile"]}>
      <CartProvider>
        <CheckoutProvider>
          <ProfileForm />
          <LocationProbe />
        </CheckoutProvider>
      </CartProvider>
    </MemoryRouter>
  );
}

describe("ProfileForm", () => {
  beforeEach(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cart: [{ productId: 1, quantity: 1 }] })
    );
  });

  it("muestra errores de campos requeridos al enviar vacío", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: "Guardar Perfil" }));

    expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("El apellido es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("El email es obligatorio")).toBeInTheDocument();
  });

  it("muestra mensaje de formato cuando el email es inválido", async () => {
    const user = userEvent.setup();
    renderForm();
    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "Caro");
    await user.type(inputs[1], "Aguirre");
    await user.type(inputs[2], "email-no-valido");
    await user.click(screen.getByRole("button", { name: "Guardar Perfil" }));

    expect(await screen.findByText("El formato del email no es válido")).toBeInTheDocument();
    expect(screen.queryByText("El nombre es obligatorio")).not.toBeInTheDocument();
  });

  it("con datos válidos completa el paso y navega a /checkout/shipping", async () => {
    const user = userEvent.setup();
    renderForm();

    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "Caro");
    await user.type(inputs[1], "Aguirre");
    await user.type(inputs[2], "caro@example.com");
    await user.click(screen.getByRole("button", { name: "Guardar Perfil" }));

    expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no es válido/i)).not.toBeInTheDocument();
    expect(await screen.findByText("/checkout/shipping")).toBeInTheDocument();
  });
});