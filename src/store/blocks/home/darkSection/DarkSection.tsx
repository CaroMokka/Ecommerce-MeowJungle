import "./DarkSection.css";

function DarkSection() {
  return (
    <section className="dark-section__container">
      <div className="dark-section__wrapper">
        <div className="dark-section__text">
          <h2>Día Meow Jungle</h2>
          <p>
            Meow Jungle ofrece productos de bienestar natural diseñados para
            aportar calma, equilibrio y relajación a tu vida. Desde aceites
            esenciales hasta velas relajantes, cada artículo te ayuda a crear
            un espacio pacífico y armonioso.
          </p>
        </div>
        <a>¿Listo? Contáctanos</a>
      </div>
      <div className="dark-section__image">
        <img src="/img/soap_jungle.webp" />
      </div>
    </section>
  );
}

export default DarkSection;
