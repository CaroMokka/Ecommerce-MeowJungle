import "./DailyCard.css";
function DailyCard() {
  return (
    <>
      <section className="daily_box">
        <div className="daily_box__image">
          <svg
            className="daily_box__svg"
            width="100%"
            height="auto"
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="irregularMask">
                <path
                  d="M100.8 -115.6C137.7 -89.1 179.6 -64.1 185.2 -32.7C190.7 -1.2 159.9 36.6 130.3 63.2C100.6 89.8 72.2 105 40.1 121.7C8 138.4 -27.8 156.6 -53.6 147.2C-79.4 137.9 -95.1 100.9 -103 68.5C-110.8 36.2 -110.8 8.3 -109.2 -22.4C-107.5 -53.1 -104.2 -86.7 -85.7 -116.4C-67.3 -146.2 -33.6 -172.1 -0.9 -171.1C31.9 -170 63.9 -142.1 100.8 -115.6Z"
                  transform="translate(400,300) scale(1.5, 1.5)"
                />
              </clipPath>
            </defs>
            <image
              href="/img/aromas2.webp"
              width="900"
              height="600"
              clipPath="url(#irregularMask)"
            />
          </svg>
        </div>
        <div>
          <h1 className="daily_box__title">Vanilla & Cinnamon Ritual</h1>
        </div>
        <div className="daily_box__text--content">
          <p>
            "A luxurious blend of exotic vanilla entwined with the earthy warmth
            of cinnamon, enriched with botanical essences to create a soothing
            and immersive jungle-inspired aroma." 🌿✨
          </p>
        </div>
      </section>
    </>
  );
}

export default DailyCard;

// Componente que recibira props --> img - titulo - parrafo
