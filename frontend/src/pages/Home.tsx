import Header from "../components/layout/header/Header";
import DailySection from "../features/home/dailySection/DailySection";
import MainBanner from "../features/home/mainBanner/MainBanner";
import LoversSection from "../features/home/loversSection/LoversSection";
import DarkSection from "../features/home/darkSection/DarkSection";
import "./style.css";

function Home() {
  return (
    <section className="home__container">
      <Header />
      <div className="home__wrapper">
        <MainBanner />
        <DailySection />
        <LoversSection />
        <DarkSection />
      </div>
    </section>
  );
}

export default Home;
