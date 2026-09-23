import DailyBoxes from './dailyBoxes/DailyBoxes'
import DailyBoxSpecial from './dailyBoxSpecial/DailyBoxSpecial'
import "../dailySection/DailySection.css";
function DailySection() {
  return (
    <>
      <section className="daily_content">
        <div className="daily_content-title">Tu Meow*Jungle diario</div>
        <div className="daily_content-text">
          <p>
            Meow Jungle está repleto de extractos botánicos naturales, infusionado
            con aceites esenciales y enriquecido con ingredientes nutritivos. Es
            perfecto para quienes buscan un momento de relajación y autocuidado.
          </p>
        </div>
        <button className="daily_content-btn">Contáctanos</button>
      </section>
      <DailyBoxes/>
      <DailyBoxSpecial/>
    </>
  );
}

export default DailySection;
