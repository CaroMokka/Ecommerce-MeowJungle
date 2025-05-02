import "./FilterProducts.css"
function FilterProducts() {
  return (
    <div className="filter-products">
      <input
        className="text-field w-input"
        maxLength={256}
        name="email-2"
        data-name="Email 2"
        placeholder="Your product"
        type="email"
        id="email-2"
      ></input>
      <input
        type="submit"
        data-wait="Please wait..."
        className="submit-button w-button"
        value="SEARCH"
      ></input>
    </div>
  );
}

export default FilterProducts;
