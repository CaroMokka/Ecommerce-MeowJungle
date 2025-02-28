import { Link } from "react-router-dom"


function CartView() {
  return (
    <div>
      <h2>Carrito</h2>
      <div>Lista de todos los productos elegidos</div>
      <div>Resumen total</div>
      <Link to="/"><button>Proceder al pago(redirige a checkout)</button></Link>
      <div>Vitrina de productos relacionados</div>
    </div>
  )
}

export default CartView
