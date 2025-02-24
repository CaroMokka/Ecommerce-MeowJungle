import "./product.css";
function product() {
  return (
    <div>
      <div className="card">
        <img src="/img/soap_sea.webp" className="card-img-top" alt="..." />
        <div className="card-body">
          <h3 className="card-title">Card title</h3>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default product;
