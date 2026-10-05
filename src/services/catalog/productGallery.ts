import { Product } from "../../types/Product";

export const getProductGallery = (product: Product): string[] =>
  product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];
