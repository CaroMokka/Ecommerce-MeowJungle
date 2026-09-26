import { useState } from "react";
import { useLocation } from "react-router-dom";

type CheckoutLocationState = { orderId?: string } | null;

function Confirmation() {
  const location = useLocation();
  const [orderId] = useState(
    () =>
      (location.state as CheckoutLocationState)?.orderId ??
      `order-${Date.now()}`
  );

  return (
    <div>
      <h3>Confirmación</h3>
      <p>Tu pedido fue registrado correctamente.</p>
      <p>Número de pedido simulado</p>
      <p className="fw-semibold">{orderId}</p>
    </div>
  );
}

export default Confirmation;