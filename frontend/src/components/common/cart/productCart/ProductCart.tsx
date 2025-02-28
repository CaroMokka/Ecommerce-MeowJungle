import QuantityProduct from "./quantityProduct/QuantityProduct";
function ProductCart() {
  return (
    <>
      <div className="card mb-3" style={{ width: "100%" }}>
        <div className="row g-0">
          <div className="col-md-2">
            <img
              src="/img/soap_citric.webp"
              className="img-fluid rounded-start"
              alt="..."
              style={{ width: "100px" }}
            />
          </div>
          <div className="col-md-10">
            <div className="card-body d-flex flex-row justify-content-between">
              <p className="card-title">Soap Citric</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  <strong>$4.990</strong>
                </small>
              </p>
              <QuantityProduct />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCart;
