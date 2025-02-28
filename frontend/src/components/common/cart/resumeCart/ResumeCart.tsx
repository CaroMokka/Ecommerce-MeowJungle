function ResumeCart() {
  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div>Total productos (3)</div>
        </li>
        <li className="list-group-item">
          <div>SubTotal $40.256</div>
        </li>
        <li className="list-group-item">
          <div>Descuentos $ 3.560</div>
        </li>
        <li className="list-group-item">
          <div>Total $36.456</div>
        </li>
      </ul>

      <div className="d-flex flex-column">
        <button type="button" className="btn btn-outline-dark">
          Pagar
        </button>
        <button type="button" className="btn btn-outline-dark">
          Seguir comprando
        </button>
      
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
         

          <rect x="16" y="20" width="32" height="36" fill="black" />
          <rect x="12" y="16" width="40" height="4" fill="black" />
          <rect x="24" y="8" width="16" height="4" fill="black" />
        </svg>
      </div>
    </div>
  );
}

export default ResumeCart;
