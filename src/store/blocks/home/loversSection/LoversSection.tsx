import LoversBoxes from './loversBoxes/LoversBoxes'
import "./LoversSection.css";

function Lovers() {
  return (
    <>
    <section className="lovers-section__wrapper">
      <h2 className="lovers-section__title">#MeowJungle Lovers</h2>
      <p className="lovers-section__content">
        MeoJungle offers natural wellness products designed to bring calm,
        balance, and relaxation into your life. From essential oils to soothing
        candles, each item helps you create a peaceful, harmonious space.
      </p>
      <LoversBoxes/>
    </section>
    
    </>
  );
}

export default Lovers;
