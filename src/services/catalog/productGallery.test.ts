import { getProductGallery } from "./productGallery";
import { createProductFixture } from "../../test/fixtures/productFixture";

describe("getProductGallery", () => {
  it("devuelve la imagen principal cuando el producto no tiene galería", () => {
    const product = createProductFixture({ id: 1, image: "/img/vela.webp" });

    expect(getProductGallery(product)).toEqual(["/img/vela.webp"]);
  });

  it("devuelve la galería del producto cuando existe", () => {
    const product = createProductFixture({
      id: 2,
      image: "/img/vela.webp",
      gallery: ["/img/vela.webp", "/img/vela-detalle.webp"],
    });

    expect(getProductGallery(product)).toEqual([
      "/img/vela.webp",
      "/img/vela-detalle.webp",
    ]);
  });

  it("cae en la imagen principal cuando la galería está vacía", () => {
    const product = createProductFixture({
      id: 3,
      image: "/img/difusor.webp",
      gallery: [],
    });

    expect(getProductGallery(product)).toEqual(["/img/difusor.webp"]);
  });

  it("no muta el producto recibido", () => {
    const product = createProductFixture({ id: 4, image: "/img/aceite.webp" });

    getProductGallery(product);

    expect(product.gallery).toBeUndefined();
  });
});
