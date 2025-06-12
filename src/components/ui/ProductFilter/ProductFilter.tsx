import { useState, useEffect } from "react";
import { Product } from "../../../types/Product";
import { useProductFilter } from "../../../context/filterProducts/useFilterProduct"

interface ProductFilterProps {
  products: Product[];
}

function ProductFilter({ products }: ProductFilterProps) {
  const [searchName, setSearchName] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");

  const { setProducts, setFilteredProducts } = useProductFilter();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchName = product.name?.toLowerCase().includes(searchName.toLowerCase());
      const matchDepartment = department ? product.department === department : true;
      const matchCategory = category ? product.category === category : true;

      return matchName && matchDepartment && matchCategory;
    });

    setFilteredProducts(filtered);
}, [searchName, department, category, products, setFilteredProducts]);

const departments = Array.from(new Set(products.map((p) => p.department).filter(Boolean)));
  const categories = Array.from(
    new Set(products.filter((p) => !department || p.department === department).map((p) => p.category).filter(Boolean))
  ); 


  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        onBlur={() => setSearchName("")}
      />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Todos los departamentos</option>
        {departments.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilter;
