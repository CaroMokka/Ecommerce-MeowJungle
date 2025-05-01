import { Link } from "react-router-dom";
import useOffcanvas from "../../../../hooks/useOffcanvas";

function ButtonPay() {
  const { closeOffcanvas } = useOffcanvas();
  return (
    <div>
      <button type="button" className="btn btn-outline-dark">
        <Link
          to="/checkout"
          style={{ textDecoration: "none", color: "#000" }}
          onClick={closeOffcanvas}
        >
          Continuar con la compra
        </Link>
      </button>
    </div>
  );
}

export default ButtonPay;
