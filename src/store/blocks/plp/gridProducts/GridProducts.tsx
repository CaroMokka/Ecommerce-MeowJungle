import ProductSummary from "../../../../components/ui/ProductSummary/ProductSummary"
import { products } from "../../../../data/productSummaryData"
import "./GridProduct.css"
function GridProducts() {
  return (
    <div >
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
