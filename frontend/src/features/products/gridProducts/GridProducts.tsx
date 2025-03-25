import Product from "../product/Product"
import FilterProducts from "../filterProducts/FilterProducts"
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
