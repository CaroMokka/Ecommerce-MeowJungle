import Header from "../store/blocks/header/Header";
import Footer from "../store/blocks/footer/Footer";
import Banner from "../components/common/Banner";
import { aboutBannerData } from "../data/aboutData";
function About() {
  const { title, subtitle, description } = aboutBannerData[0];
  return (
    <div>
      <Header />
      <div className="global-page__wrapper">
        <Banner title={title} subtitle={subtitle} description={description} />
      </div>

      <Footer />
    </div>
  );
}

export default About;
