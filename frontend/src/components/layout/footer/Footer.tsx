import "./Footer.css";

function Footer() {
  return (
    <section className="footer-section">
      <div className="footer-section__image">
        <img src="/img/img_footer.png" />
      </div>
      <div className="footer-section__navbar">
        <nav>
          <a>HOME</a>
          <a>ABOUT</a>
          <a>PRODUCTS</a>
          <a>OUR LOCATIONS</a>
          <a>CONTACT</a>
        </nav>
      </div>
      <div className="footer-section__form">
        <h4 className="footer-section__form-title">join our newsletter</h4>
        <form className="footer-section__form-content">
          <input
            className="footer-section__form-input text-field w-input"
            maxLength={256}
            name="email-2"
            data-name="Email 2"
            placeholder="Your email"
            type="email"
            id="email-2"
            required
          />
          <input
            type="submit"
            data-wait="Please wait..."
            className="footer-section__form-submit submit-button w-button"
            value="SUBSCRIBE"
          />
        </form>
      </div>

      <div className="footer-section__navbar">
        <nav>
          <a>Policy privacy</a>
          <a>Terms and conditions</a>
          <a>License</a>
          <a>Copyright</a>
        </nav>
      </div>
      <p className="footer-section__paragraph" >Make by Caro</p>
    </section>
  );
}

export default Footer;
