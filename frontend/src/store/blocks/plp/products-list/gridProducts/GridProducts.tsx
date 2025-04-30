import ProductSummary from "../product-summary/ProductSummary"
import FilterProducts from "../filterProducts/FilterProducts"
import "./GridProduct.css"
function GridProducts() {
  return (
    <div >
      <FilterProducts/>
        <div className="grid-products" >
        <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
      <ProductSummary/>
        </div>
    </div>
  )
}

export default GridProducts
