import { Navigate } from "react-router-dom";
import useCheckout from "../../context/checkout/useCheckout";
import { formatPrice } from "../../utils/formatPrice";

function Confirmation() {
  const { order } = useCheckout();

  if (!order) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div>
      <h3>Confirmación</h3>
      <p>Tu pedido fue registrado correctamente.</p>
      <p>Número de pedido simulado</p>
      <p className="fw-semibold">{order.id}</p>
      <div>Productos: {order.itemCount}</div>
      <div>Total: {formatPrice(order.subtotal)}</div>
      <ul>
        {order.lines.map((line) => (
          <li key={line.productId}>
            <span>
              {line.product.name} × {line.quantity}
            </span>{" "}
            — <span>{formatPrice(line.lineTotal)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Confirmation;