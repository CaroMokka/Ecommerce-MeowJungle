import { Link } from "react-router-dom";

type ResumeCheckoutProps = {
  totalItems: number;
  totalAmount: number;
}

function ResumeCheckout({ totalItems, totalAmount }: ResumeCheckoutProps) {
  return (
    <div>
      <h1>Checkout Resume</h1>
          <div className="">Resumen total</div>
          <div className="d-flex flex-column align-items-end p-3" >
      <ul className="list-group list-group-flush">
        <div className="list-group-item">
          <div>Total productos</div>
          <div>{totalItems}</div>
        </div>
        <li className="list-group-item">
          <div>SubTotal</div>
          <div>$ {totalAmount}</div>
        </li>
        {/* <li className="list-group-item">
          <div>Descuentos</div>
          <div>$3.560</div>
        </li> */}
        <li className="list-group-item">
          <div>Total</div>
          <div>$ {totalAmount}</div>
        </li>
      </ul>
    </div>
          <Link to="/shipping">
            <button>Ir a Pagar</button>
          </Link>
    </div>
  )
}

export default ResumeCheckout
