import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductGallery from "./ProductGallery";
import { createProductFixture } from "../../../test/fixtures/productFixture";

const productWithGallery = createProductFixture({
  id: 12,
  image: "/img/vela.webp",
  alt: "Vela aromática natural",
  gallery: ["/img/vela.webp", "/img/vela-detalle.webp"],
});

describe("ProductGallery", () => {
  it("muestra la imagen principal del producto", () => {
    render(<ProductGallery product={productWithGallery} />);

    expect(screen.getByAltText("Vela aromática natural")).toHaveAttribute(
      "src",
      "/img/vela.webp"
    );
  });

  it("cambia la imagen principal al seleccionar una miniatura", async () => {
    const user = userEvent.setup();
    render(<ProductGallery product={productWithGallery} />);

    await user.click(screen.getByRole("button", { name: "Ver imagen 2 de 2" }));

    expect(
      screen.getByAltText("Vela aromática natural (vista 2)")
    ).toHaveAttribute("src", "/img/vela-detalle.webp");
  });

  it("marca la miniatura activa con aria-pressed", async () => {
    const user = userEvent.setup();
    render(<ProductGallery product={productWithGallery} />);

    const primera = screen.getByRole("button", { name: "Ver imagen 1 de 2" });
    const segunda = screen.getByRole("button", { name: "Ver imagen 2 de 2" });
    expect(primera).toHaveAttribute("aria-pressed", "true");

    await user.click(segunda);

    expect(segunda).toHaveAttribute("aria-pressed", "true");
    expect(primera).toHaveAttribute("aria-pressed", "false");
  });

  it("oculta las miniaturas cuando el producto tiene una sola imagen", () => {
    const product = createProductFixture({ id: 1, image: "/img/vela.webp" });
    render(<ProductGallery product={product} />);

    expect(
      screen.queryByRole("group", { name: "Galería de imágenes del producto" })
    ).not.toBeInTheDocument();
  });
});
