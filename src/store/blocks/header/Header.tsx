import Stripe from '../header/stripePromotion/Stripe'
import Navbar from '../header/navbar/Navbar'
import styles from "./header.module.scss";
function Header() {
  return (
    <div className={styles["header"]}>
      <Stripe/>
      <Navbar/>
    </div>
  )
}

export default Header
