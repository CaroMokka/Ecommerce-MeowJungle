import ProductCart from "../../store/blocks/minicart/productCart/ProductCart"

function ProductsListCheckout() {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Productos
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <ProductCart/>
            <ProductCart/>
            <ProductCart/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsListCheckout;
