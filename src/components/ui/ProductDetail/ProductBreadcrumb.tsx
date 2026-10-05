import { Link } from "react-router-dom";
import { Product } from "../../../types/Product";

type ProductBreadcrumbProps = {
  product: Product;
};

function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Migas de pan" className="mb-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Inicio</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/products">{product.department}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

export default ProductBreadcrumb;
