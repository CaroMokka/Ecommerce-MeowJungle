import Header from "../header/Header";
import Footer from "../footer/Footer";
import GridProducts from "./gridProducts/GridProducts";
import ProductFilter from "../../../components/ui/ProductFilter/ProductFilter";
import { products } from "../../../data/productSummaryData";

function ProductsList() {
  return (
    <div>
      <Header />
      <div className="global-page__wrapper">
        <div className="products-list__wrapper d-flex">
        <ProductFilter products={products} />
        <GridProducts />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
