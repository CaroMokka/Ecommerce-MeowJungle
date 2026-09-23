import LoversBoxes from './loversBoxes/LoversBoxes'
import "./LoversSection.css";

function Lovers() {
  return (
    <>
    <section className="lovers-section__wrapper">
      <h2 className="lovers-section__title">#MeowJungle Lovers</h2>
      <p className="lovers-section__content">
        Meow Jungle ofrece productos de bienestar natural diseñados para aportar
        calma, equilibrio y relajación a tu vida. Desde aceites esenciales hasta
        velas relajantes, cada artículo te ayuda a crear un espacio pacífico y
        armonioso.
      </p>
      <LoversBoxes/>
    </section>
    
    </>
  );
}

export default Lovers;
