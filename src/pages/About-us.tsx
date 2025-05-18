import Header from "../store/blocks/header/Header";
import Footer from "../store/blocks/footer/Footer";
import Banner from "../components/ui/Banner/Banner";
import CardInfo from "../components/ui/CardInfo/CardInfo";
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
          variant="centered"
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
          variant="centered"
        />
        <Banner
          title={aboutBannerData[2].title}
          description={aboutBannerData[2].description}
          cardFooterButton={aboutBannerData[2].cardFooterBotton}
          image={aboutBannerData[2].image}
          variant="default-row"
        />
        <Banner
          title={aboutBannerData[3].title}
          description={aboutBannerData[3].description}
          variant="centered"
        />
        <Banner
          title={aboutBannerData[4].title}
          description={aboutBannerData[4].description}
          variant="reverse-vibrant"
        />
      </div>
      <Banner
          title={aboutBannerData[5].title}
          description={aboutBannerData[4].description}
          image={aboutBannerData[5].image}
          variant="reverse-col"
        />

      <Footer />
    </div>
  );
}

export default About;
