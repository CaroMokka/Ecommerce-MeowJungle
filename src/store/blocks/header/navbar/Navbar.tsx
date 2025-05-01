import { Link } from "react-router-dom"
import Cart from "../../minicart/Cart"
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="container_nav">
      <section className="wrapper_nav">
        <button><Link to="/" className="nav-link">Home</Link></button>
        <button>About</button>
        <button><Link to="/products" className="nav-link">Products</Link></button>
      </section>
      <section>
        <div className="wrapper_title">MEOW ** JUNGLE</div>
      </section>
      <section className="wrapper_icons">
        <div  className="icons-locations">
          <Link to="/checkout">Our locations</Link>
        </div>
        <Cart/>
      </section>
    </nav>
  );
}

export default Navbar;
