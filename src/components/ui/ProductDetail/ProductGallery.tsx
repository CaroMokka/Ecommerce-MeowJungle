import { useState } from "react";
import { getProductGallery } from "../../../services/catalog/productGallery";
import { Product } from "../../../types/Product";

type ProductGalleryProps = {
  product: Product;
};

function ProductGallery({ product }: ProductGalleryProps) {
  const gallery = getProductGallery(product);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeIndex = Math.min(selectedIndex, gallery.length - 1);

  return (
    <div className="d-flex flex-column gap-3">
      <img
        src={gallery[activeIndex]}
        alt={
          activeIndex === 0
            ? product.alt
            : `${product.alt} (vista ${activeIndex + 1})`
        }
        className="img-fluid rounded w-100"
      />
      {gallery.length > 1 && (
        <div
          className="d-flex flex-wrap gap-2"
          role="group"
          aria-label="Galería de imágenes del producto"
        >
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-pressed={index === activeIndex}
              aria-label={`Ver imagen ${index + 1} de ${gallery.length}`}
              onClick={() => setSelectedIndex(index)}
              className={`btn p-1 ${
                index === activeIndex ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              <img src={image} alt="" width="64" height="64" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
