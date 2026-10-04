import { createContext, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCart from "../cart/useCart";
import { CheckoutStep, resolveStep } from "./checkoutTypes";

const guardedSteps: ReadonlySet<CheckoutStep> = new Set([
  "profile",
  "shipping",
  "payment",
]);

const CheckoutContext = createContext<{ activeStep: CheckoutStep } | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { lines } = useCart();
  const activeStep = resolveStep(location.pathname);

  if (guardedSteps.has(activeStep) && lines.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <CheckoutContext.Provider value={{ activeStep }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;