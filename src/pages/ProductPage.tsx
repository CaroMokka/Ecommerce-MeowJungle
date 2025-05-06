import { useParams } from 'react-router-dom'
import { products } from '../data/productSummaryData';
import ProductSummary from "../components/ui/product-summary/ProductSummary"

function ProductPage() {
    const { productId } = useParams<{ productId: string }>();
    // Aquí puedes usar el id para buscar el producto en tu array o hacer una petición
    const product = products.find((product) => product.id === Number(productId));
    // Si no encuentras el producto, puedes redirigir a una página de error o mostrar un mensaje
    if (!product) {
        return <h1>Product not found</h1>;
    }
  return (
    <ProductSummary product={product} variant="pdp" />
  )
}

export default ProductPage