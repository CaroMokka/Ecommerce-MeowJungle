export interface ShippingDetails {
  weight: string;
  dimensions: string;
  shippingMethod: string;
  shippingCost: number;
  estimatedDelivery: string;
}

export interface ProductDimensions {
  width: string;
  height: string;
  depth: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  image: string;
  alt: string;
  gallery?: string[];
  variants?: ProductVariant[];
  price: number;
  rating: number;
  reviews: number;
  department: string;
  category: string;
  stock: number;
  tags: string[];
  dimensions: ProductDimensions;
  materials: string[];
  careInstructions: string;
  shippingDetails: ShippingDetails;
}