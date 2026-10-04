import { useContext } from "react";
import CheckoutContext from "./checkoutContext";

const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout debe usarse dentro de un CheckoutProvider");
  }
  return context;
};

export default useCheckout;