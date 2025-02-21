import './Footer.css'

function Footer() {
  return (
    <section className="footer-section__wrapper">
      <div className="footer-section__image" >
        <img src="/img/img_footer.png" />
      </div>
      <div className="footer-section__navbar" >  
          <nav>
              <a>HOME</a>
              <a>ABOUT</a>
              <a>PRODUCTS</a>
              <a>OUR LOCATIONS</a>
              <a>CONTACT</a>
          </nav>
      </div>
      <form>join our newsletter</form>
      <nav>
          <ul>
              <li>Policy privacy</li>
              <li>Terms and conditions</li>
              <li>License</li>
              <li>Copyright</li>
          </ul>
      </nav>
      <p>Make by Caro</p>
    </section>
  )
}

export default Footer
