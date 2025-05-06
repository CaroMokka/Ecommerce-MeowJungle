import { useParams } from "react-router-dom";
import { products } from "../data/productSummaryData";
import ProductSummary from "../components/ui/ProductSummary/ProductSummary";
import Header from "../store/blocks/header/Header";
import Footer from "../store/blocks/footer/Footer";

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((product) => product.id === Number(productId));
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return (
    <>
      <Header />
      <div className="global-page__wrapper">
        <ProductSummary product={product} variant="pdp" />
      </div>

      <Footer />
    </>
  );
}

export default ProductPage;
