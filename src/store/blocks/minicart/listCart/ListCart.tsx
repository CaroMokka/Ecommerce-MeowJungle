import ProductSummary from "../../../../components/ui/ProductSummary/ProductSummary"
import { products } from "../../../../data/productSummaryData"
//import ProductCart from "../productCart/ProductCart"
// import ProductSummary from "../../../../components/ui/product-summary/ProductSummary"
function ListCart() {
  return (
    <div>
      <ProductSummary product={products[0]} variant="minicart"/>
    </div>
  )
}

export default ListCart
