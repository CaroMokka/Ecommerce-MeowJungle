import MainBanner from '../mainBanner/MainBanner'
import Header from '../layout/Header'
import DailySection from '../dailySection/DailySection'
import LoversSection from '../loversSection/LoversSection'
import DarkSection from '../darkSection/darkSection'
import Footer from '../layout/Footer'
import './BigWrapper.css'

function BigWrapper() {
  return (
    <>
     <div className='big_wrapper' >
     <Header/>
     <MainBanner/>
     <DailySection/>
     <LoversSection/>
     <DarkSection/>
     <Footer/>
     </div>
    </>
  )
}

export default BigWrapper

// este componente <DailySection/> deberia tranformarce en uno generico llamado CTA o llamado aka action