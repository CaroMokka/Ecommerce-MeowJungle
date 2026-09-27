import { Product } from "../../types/Product";

const baseProduct: Product = {
  id: 1,
  name: "Producto de Prueba",
  brand: "Meow Jungle Eco",
  description: "Descripción de prueba.",
  image: "/img/placeholder.webp",
  alt: "Producto de Prueba",
  price: 1000,
  rating: 4.5,
  reviews: 10,
  department: "Bienestar",
  category: "Esencias",
  stock: 10,
  tags: ["test"],
  dimensions: {
    width: "10cm",
    height: "10cm",
    depth: "10cm",
  },
  materials: ["algodón orgánico"],
  careInstructions: "Limpiar con paño seco.",
  shippingDetails: {
    weight: "1kg",
    dimensions: "10cm x 10cm x 10cm",
    shippingMethod: "Standard Shipping",
    shippingCost: 500,
    estimatedDelivery: "2-4 business days",
  },
};

export function createProductFixture(overrides: Partial<Product> = {}): Product {
  return { ...baseProduct, ...overrides };
}