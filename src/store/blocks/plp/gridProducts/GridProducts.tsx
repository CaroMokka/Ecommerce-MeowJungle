import ProductSummary from "../../../../components/ui/product-summary/ProductSummary"
import FilterProducts from "../filterProducts/FilterProducts"
import { products } from "../../../../data/productSummaryData"
import "./GridProduct.css"
function GridProducts() {
  return (
    <div >
      <FilterProducts/>
        <div className="grid-products" >
          {products.map((product) => {
            return (
              <div className="grid-products__item" key={product.id}>
                <ProductSummary
                  product={product}
                  variant="shelf"
                />
              </div>
            )
          })}
     
        </div>
    </div>
  )
}

export default GridProducts
