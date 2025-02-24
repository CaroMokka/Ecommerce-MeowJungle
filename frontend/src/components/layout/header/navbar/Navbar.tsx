import { Link } from "react-router-dom"
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
        <a href="#" className="icons-cart">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 6h15l-2 8H8"></path>
            <circle cx="9" cy="20" r="2"></circle>
            <circle cx="18" cy="20" r="2"></circle>
            <path d="M6 6L4 2H1"></path>
          </svg>
        </a>
      </section>
    </nav>
  );
}

export default Navbar;
