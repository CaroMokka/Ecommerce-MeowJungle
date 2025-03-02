import { Link } from "react-router-dom";
import useOffcanvas from "../../../../hooks/useOffCanvas";

function ButtonBuy() {
  const { closeOffcanvas } = useOffcanvas();
  return (
    <div>
      <button type="button" className="btn btn-outline-dark">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#000" }}
          onClick={closeOffcanvas}
        >
          {" "}
          Seguir comprando
        </Link>
      </button>
    </div>
  );
}

export default ButtonBuy;
