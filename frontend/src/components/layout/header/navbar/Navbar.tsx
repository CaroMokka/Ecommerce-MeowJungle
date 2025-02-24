import { Link } from "react-router-dom"
import Cart from "../../../common/cart/Cart"
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="container_nav">
      <section className="wrapper_nav">
        <a href="#"><Link to="/" className="nav-link">Home</Link></a>
        <a href="#">About</a>
        <a href="#"><Link to="/products" className="nav-link">Products</Link></a>
      </section>
      <section>
        <div className="wrapper_title">MEOW ** JUNGLE</div>
      </section>
      <section className="wrapper_icons">
        <a href="#" className="icons-locations">
          Our locations
        </a>
        <Cart/>
      </section>
    </nav>
  );
}

export default Navbar;
