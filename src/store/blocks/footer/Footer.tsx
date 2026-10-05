import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer-section">
      <div className="footer-section__image">
        <img src="/img/img_footer.png" />
      </div>
      <div className="footer-section__navbar">
        <nav>
          <Link to="/">INICIO</Link>
          <Link to="/about">NOSOTROS</Link>
          <Link to="/products">PRODUCTOS</Link>
          <Link to="/">NUESTRAS TIENDAS</Link>
          <button type="button">CONTACTO</button>
        </nav>
      </div>

      <div className="footer-section__navbar">
        <nav>
          <span>Política de privacidad</span>
          <span>Términos y condiciones</span>
          <span>Licencia</span>
          <span>Derechos de autor</span>
        </nav>
      </div>
      <p className="footer-section__paragraph">Hecho por Caro</p>
    </section>
  );
}

export default Footer;
