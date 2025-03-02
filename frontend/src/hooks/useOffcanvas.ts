import { useCallback } from "react";

interface OffcanvasHook {
    closeOffcanvas: () => void
}
const useOffcanvas = ():OffcanvasHook => {
  const closeOffcanvas = useCallback(() => {
    const offcanvasElement = document.getElementById("offcanvasRight");
    if (offcanvasElement) {
      const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(
        offcanvasElement
      );
      bsOffcanvas?.hide(); // Cerrar el offcanvas
    }
    document.body.classList.remove("offcanvas-open", "overflow-hidden");
    document.documentElement.style.overflow = "auto";
    
  }, []);
  return { closeOffcanvas }
};

export default useOffcanvas