import Header from "../header/Header";
import Footer from "../footer/Footer";
import GridProducts from "./gridProducts/GridProducts";
import ProductFilter from "../../../components/ui/ProductFilter/ProductFilter";
import { ProductFilterProvider } from "../../../context/filterProducts/filterProductProvider";
import { getProducts } from "../../../services/catalog/catalogRepository";

function ProductsList() {
  return (
    <div>
      <Header />
      <div className="global-page__wrapper">
        <div className="products-list__wrapper d-flex">
        
        <ProductFilterProvider>
        <ProductFilter products={getProducts()} />
          <GridProducts />
        </ProductFilterProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
