import { Link } from "react-router-dom"

function ButtonPay() {
  return (
    <div>

      <button type="button" className="btn btn-outline-dark">
          <Link to="/cart" style={{textDecoration: "none", color: "#000"}}>Pagar</Link>
        </button>

    </div>
  )
}

export default ButtonPay
