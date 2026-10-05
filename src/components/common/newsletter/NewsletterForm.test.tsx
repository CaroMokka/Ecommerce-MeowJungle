import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "./NewsletterForm";

const STORAGE_KEY = "newsletterContacts";

const readContacts = (): { email: string; subscribedAt: string }[] =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as {
    email: string;
    subscribedAt: string;
  }[];

const setupForm = () => {
  const user = userEvent.setup();
  render(<NewsletterForm />);

  const input = screen.getByLabelText("Correo electrónico");
  const button = screen.getByRole("button", { name: "Suscribirme" });

  return {
    submit: async (email: string) => {
      await user.type(input, email);
      await user.click(button);
    },
    submitEmpty: async () => {
      await user.click(button);
    },
  };
};

describe("NewsletterForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra error al suscribirse sin correo", async () => {
    const form = setupForm();

    await form.submitEmpty();

    expect(
      await screen.findByText("Ingresa un correo electrónico válido.")
    ).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("muestra error con un correo inválido", async () => {
    const form = setupForm();

    await form.submit("correo-sin-arroba");

    expect(
      await screen.findByText("Ingresa un correo electrónico válido.")
    ).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("persiste el contacto y muestra el mensaje de éxito", async () => {
    const form = setupForm();

    await form.submit("caro@example.com");

    expect(
      await screen.findByText(
        "¡Listo! Te suscribiste al boletín de Meow Jungle."
      )
    ).toBeInTheDocument();

    const contacts = readContacts();
    expect(contacts).toHaveLength(1);
    expect(contacts[0].email).toBe("caro@example.com");
    expect(contacts[0].subscribedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("limpia el campo tras suscribirse", async () => {
    const form = setupForm();

    await form.submit("caro@example.com");

    expect(await screen.findByLabelText("Correo electrónico")).toHaveValue("");
  });

  it("no duplica el contacto si el correo ya está suscrito", async () => {
    const form = setupForm();

    await form.submit("caro@example.com");
    await form.submit("CARO@example.com");

    expect(
      await screen.findByText(
        "Este correo ya está suscrito a nuestro boletín."
      )
    ).toBeInTheDocument();
    expect(readContacts()).toHaveLength(1);
  });

  it("sigue funcionando si el almacenamiento está corrupto", async () => {
    localStorage.setItem(STORAGE_KEY, "{no-json");
    const form = setupForm();

    await form.submit("caro@example.com");

    expect(
      await screen.findByText(
        "¡Listo! Te suscribiste al boletín de Meow Jungle."
      )
    ).toBeInTheDocument();
    expect(readContacts()).toHaveLength(1);
  });

  it("ignora entradas inválidas que ya estaban guardadas", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ email: 42 }, null]));
    const form = setupForm();

    await form.submit("caro@example.com");

    const contacts = readContacts();
    expect(contacts).toHaveLength(1);
    expect(contacts[0].email).toBe("caro@example.com");
  });
});
