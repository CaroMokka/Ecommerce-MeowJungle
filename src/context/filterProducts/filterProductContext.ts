import { createContext } from "react";
import { Product } from "../../types/Product";

export interface ProductFilterContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

export const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined);
