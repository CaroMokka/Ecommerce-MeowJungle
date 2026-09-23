import { Link } from "react-router-dom"
import Minicart from "../../minicart/Minicart"
import styles from "./navbar.module.scss";
function Navbar() {
  return (
    <nav className={styles["navbar"]}>
      <section className={styles["navbar__wrapper"]}>
      <Link to="/" className={styles["navbar-link"]}>Inicio</Link>
      <Link to="/about" className={styles["navbar-link"]}>Nosotros</Link>
      <Link to="/products" className={styles["navbar-link"]}>Productos</Link>
      </section>
      <section>
        <div className={styles["navbar-title"]}>MEOW * JUNGLE * ECO</div>
      </section>
      <section className={styles["navbar__icons"]}>
        <div  className={styles["navbar__icons-locations"]}>
          <Link to="/">Nuestras tiendas</Link>
        </div>
        <Minicart/>
      </section>
    </nav>
  );
}

export default Navbar;
