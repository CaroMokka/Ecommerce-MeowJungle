
function ShippingForm() {
  return (
    <form>
  <div className="mb-3">
    <label htmlFor="inputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp"/>
    <div id="nameHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default ShippingForm
