import { useParams } from 'react-router-dom'
import { products } from '../data/productSummaryData';
import ProductSummary from "../components/ui/ProductSummary/ProductSummary"

function ProductPage() {
    const { productId } = useParams<{ productId: string }>();
    const product = products.find((product) => product.id === Number(productId));
    if (!product) {
        return <h1>Product not found</h1>;
    }
  return (
    <ProductSummary product={product} variant="pdp" />
  )
}

export default ProductPage