import Header from "../header/Header";
import Footer from "../footer/Footer";
import GridProducts from "./gridProducts/GridProducts";
function Products() {
  return (
    <div>
      <Header />
      <div className="global-page__wrapper">
        <GridProducts />
      </div>
      <Footer />
    </div>
  );
}

export default Products;
