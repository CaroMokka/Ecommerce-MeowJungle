import { Link } from "react-router-dom";
import useOffcanvas from "../../../../hooks/useOffCanvas";

function ButtonPay() {
  const { closeOffcanvas } = useOffcanvas();
  return (
    <div>
      <button type="button" className="btn btn-outline-dark">
        <Link
          to="/cart"
          style={{ textDecoration: "none", color: "#000" }}
          onClick={closeOffcanvas}
        >
          Pagar
        </Link>
      </button>
    </div>
  );
}

export default ButtonPay;
