export interface Product {
    id: number;
    name?: string;
    brand?: string;
    description?: string;
    image?: string;
    alt?: string;
    price?: number;
    rating?: number;
    reviews?: number;
    department?: string;
    category?: string;
    stock?: number;
    tags?: string[];
    dimensions?: {
      width: string;
      height: string;
      depth: string;
    };
    materials?: string[];
    careInstructions?: string;
    shippingDetails?: {
      weight: string;
      dimensions: string;
      shippingMethod: string;
      shippingCost: number;
      estimatedDelivery: string;
    };
  }
  