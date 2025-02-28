import { Link } from "react-router-dom"
function ButtonBuy() {
  return (
    <div>
       <button type="button" className="btn btn-outline-dark">
         <Link to="/" style={{textDecoration: "none", color: "#000"}}> Seguir comprando</Link>
         
        </button>
        <button><Link to="/products" className="nav-link">Products</Link></button>
    </div>
  )
}

export default ButtonBuy
