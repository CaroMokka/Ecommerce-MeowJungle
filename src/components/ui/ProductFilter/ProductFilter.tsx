import { useState } from "react";
import { Product } from "../../../types/Product";

interface ProductFilterProps {
  products: Product[];
}

function ProductFilter({ products }: ProductFilterProps) {
  const [searchName, setSearchName] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");

  const departments = Array.from(
    new Set(products.map((product) => product.department).filter(Boolean))
  );
  const categories = Array.from(
    new Set(
        products
          .filter((product) => !department || product.department === department)
          .map((product) => product.category)
          .filter(Boolean)
      )
  );

  const filteredProducts = products.filter((product) => {
    const matchName = product.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const matchDepartment = department
      ? product.department === department
      : true;
    const matchCategory = category ? product.category === category : true;

    return matchName && matchDepartment && matchCategory;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
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
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductFilter;
