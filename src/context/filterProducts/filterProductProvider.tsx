import { useState } from "react";
import { ProductFilterContext, ProductFilterContextType } from "./filterProductContext";
import { Product } from "../../types/Product";
import { ReactNode } from "react";

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const value: ProductFilterContextType = {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
  };

  return (
    <ProductFilterContext.Provider value={value}>
      {children}
    </ProductFilterContext.Provider>
  );
}
