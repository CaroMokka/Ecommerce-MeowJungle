import ProductSummary from "../../../../components/ui/ProductSummary/ProductSummary"
import { useProductFilter } from "../../../../context/filterProducts/useFilterProduct"
import "./GridProduct.css"
function GridProducts() {
  const { filteredProducts } = useProductFilter();
  return (
    <div >
        <div className="grid-products" >
        {filteredProducts.length === 0 ? (
        <h2 className="no-products-message">No se encontraron productos con los filtros seleccionados.</h2>
      ) : (
        filteredProducts.map((product) => (
          <div className="grid-products__item" key={product.id}>
            <ProductSummary product={product} variant="shelf" />
          </div>
        ))
      )}
     
        </div>
    </div>
  )
}

export default GridProducts
