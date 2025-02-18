import "./DarkSection.css";

function DarkSection() {
  return (
    <section className="dark-section__container">
      <div className="dark-section__wrapper">
        <div className="dark-section__text">
          <h2>Meow Jungle Day</h2>
          <p>
            Yogo requires less land, uses less water, and generates fewer
            greenhouse gas emissions than conventional yoghurt.
          </p>
        </div>
        <a>Ready for it? Contact us</a>
      </div>
      <div className="dark-section__image">
        <img src="/img/soap_jungle.webp" />
      </div>
    </section>
  );
}

export default DarkSection;
