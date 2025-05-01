import { Link } from "react-router-dom";

function ResumeCheckout() {
  return (
    <div>
      <h1>Checkout Resume</h1>
          <div className="">Resumen total</div>
          <Link to="/shipping">
            <button>Continuar con la compra</button>
          </Link>
    </div>
  )
}

export default ResumeCheckout
