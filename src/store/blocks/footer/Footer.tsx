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
      <div className="footer-section__form">
        <h4 className="footer-section__form-title">Únete a nuestro newsletter</h4>
        <form className="footer-section__form-content">
          <input
            className="footer-section__form-input text-field w-input"
            maxLength={256}
            name="email-2"
            data-name="Email 2"
            placeholder="Tu email"
            type="email"
            id="email-2"
            required
          />
          <input
            type="submit"
            data-wait="Por favor espera..."
            className="footer-section__form-submit submit-button w-button"
            value="SUSCRIBIRSE"
          />
        </form>
      </div>

      <div className="footer-section__navbar">
        <nav>
          <span>Política de privacidad</span>
          <span>Términos y condiciones</span>
          <span>Licencia</span>
          <span>Derechos de autor</span>
        </nav>
      </div>
      <p className="footer-section__paragraph" >Hecho por Caro</p>
    </section>
  );
}

export default Footer;
