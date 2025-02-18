import DailyBoxes from './dailyBoxes/DailyBoxes'
import DailyBoxSpecial from './dailyBoxSpecial/DailyBoxSpecial'
import "../dailySection/DailySection.css";
function DailySection() {
  return (
    <>
      <section className="daily_content">
        <div className="daily_content-title">Your daily Meow*Jungle</div>
        <div className="daily_content-text">
          <p>
            Meow Jungle is packed with natural botanical extracts, infused with
            essential oils, and rich in nourishing ingredients. It's perfect for
            everyone seeking a moment of relaxation and self-care.
          </p>
        </div>
        <button className="daily_content-btn">Contact us</button>
      </section>
      <DailyBoxes/>
      <DailyBoxSpecial/>
    </>
  );
}

export default DailySection;
