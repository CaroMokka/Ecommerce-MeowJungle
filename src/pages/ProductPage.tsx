import { useParams } from "react-router-dom";
import { getProductById } from "../services/catalog/catalogRepository";
import ProductSummary from "../components/ui/ProductSummary/ProductSummary";
import Header from "../store/blocks/header/Header";
import Footer from "../store/blocks/footer/Footer";

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(Number(productId ?? ""));
  if (!product) {
    return <h1>Producto no encontrado</h1>;
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
