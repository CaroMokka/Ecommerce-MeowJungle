import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ✅ Cerrar cualquier Offcanvas abierto
    const offcanvas = document.querySelector(".offcanvas.show");
    if (offcanvas && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);

      if (bsOffcanvas) bsOffcanvas.hide();
    }

    // ✅ Eliminar la clase 'modal-open' del body para restaurar el scroll
    document.body.classList.remove("modal-open");
  }, [pathname]);

  return null;
};

export default ScrollToTop;

