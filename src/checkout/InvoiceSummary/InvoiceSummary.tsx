import { Link } from "react-router-dom";

type InvoiceSummaryProps = {
  totalItems: number;
  totalAmount: number;
};


function InvoiceSummary({ totalItems, totalAmount }: InvoiceSummaryProps) {
    
  return (
    <div className="d-flex flex-column">
    <div className="card border border-black m-3" style={{ width: "18rem;" }}>
      <div className="card-body">
        <h3 className="card-title">Resumen de Pago</h3>
        <ul className="list-group list-group-flush">
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <div>Cantidad productos</div>
            <div className="text-end">{totalItems}</div>
          </div>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>Descuentos</div>
            <div className="text-end">$3.560</div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>SubTotal</div>
            <div className="text-end">$ {totalAmount}</div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>Total</div>
            <div className="text-end fw-semibold">$ {totalAmount}</div>
          </li>
        </ul>
      </div>
    </div>

    <div className="ms-auto m-3">
    <Link to="/shipping" className="text-decoration-none">
      <button className="btn btn-primary mt-3">Ir a Pagar</button>
    </Link>
    </div>
  </div>
  )
}

export default InvoiceSummary