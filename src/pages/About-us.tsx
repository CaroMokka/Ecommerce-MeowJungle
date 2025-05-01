import Header from "../store/blocks/header/Header";
import Footer from "../store/blocks/footer/Footer";
import Banner from "../components/common/Banner/Banner";
import CardInfo from "../components/common/CardInfo";
import { aboutBannerData, infoCardAbout } from "../data/aboutData";

function About() {
  return (
    <div className="section-about__container">
      <Header />
      <div className="global-page__wrapper">
        <Banner
          title={aboutBannerData[0].title}
          subtitle={aboutBannerData[0].subtitle}
          description={aboutBannerData[0].description}
          variant="minimal"
        />
        <div className="d-flex section-about__content">
          {infoCardAbout.map((item) => {
            const { id, titleInfoCard, descriptionInfocard } = item;
            return (
              <CardInfo
                key={id}
                title={titleInfoCard}
                description={descriptionInfocard}
              />
            );
          })}
        </div>
        <Banner
          title={aboutBannerData[1].title}
          description={aboutBannerData[1].description}
          cardFooter={aboutBannerData[1].cardFooter}
          cardFooterButton={aboutBannerData[1].cardFooterBotton}
          variant="minimal"
        />
        <Banner
          title={aboutBannerData[2].title}
          description={aboutBannerData[2].description}
          cardFooterButton={aboutBannerData[2].cardFooterBotton}
          image={aboutBannerData[2].image}
          variant="default-row"
        />
      </div>

      <Footer />
    </div>
  );
}

export default About;
