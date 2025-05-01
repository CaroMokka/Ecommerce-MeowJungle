import Header from "../header/Header";
import DailySection from "./dailySection/DailySection";
import MainBanner from "./mainBanner/MainBanner";
import LoversSection from "./loversSection/LoversSection";
import DarkSection from "./darkSection/DarkSection";
import Footer from "../footer/Footer"
import "./style.css";

function Home() {
  return (
    <section className="home__container">
      <Header />
      <div className="global-page__wrapper">
        <MainBanner />
        <DailySection />
        <LoversSection />
        <DarkSection />
      </div>
      <Footer/>
    </section>
  );
}

export default Home;
