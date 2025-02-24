import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import GridProducts from "../features/products/gridProducts/GridProducts";
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
