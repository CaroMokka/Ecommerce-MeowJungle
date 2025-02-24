import Product from "../product/product"
import FilterProducts from "../filterProducts/filterProducts"
import "./GridProduct.css"
function GridProducts() {
  return (
    <div >
      <FilterProducts/>
        <div className="grid-products" >
        <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
        </div>
    </div>
  )
}

export default GridProducts
