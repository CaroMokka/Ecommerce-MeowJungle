import { createContext, ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCart from "../cart/useCart";
import { CheckoutStep, CHECKOUT_STEPS, resolveStep } from "./checkoutTypes";

const guardedSteps: ReadonlySet<CheckoutStep> = new Set([
  "profile",
  "shipping",
  "payment",
]);

const checkoutSteps = CHECKOUT_STEPS as readonly CheckoutStep[];

const requiredBefore = (step: CheckoutStep): CheckoutStep[] => {
  const index = checkoutSteps.indexOf(step);
  return index > 0 ? checkoutSteps.slice(0, index) : [];
};

type CheckoutContextValue = {
  activeStep: CheckoutStep;
  completedSteps: Readonly<CheckoutStep[]>;
  completeStep: (step: CheckoutStep) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

type CheckoutProviderProps = {
  children: ReactNode;
  initialCompletedSteps?: CheckoutStep[];
};

export const CheckoutProvider = ({
  children,
  initialCompletedSteps = [],
}: CheckoutProviderProps) => {
  const location = useLocation();
  const { lines } = useCart();
  const [completedSteps, setCompletedSteps] = useState<CheckoutStep[]>(
    initialCompletedSteps
  );

  const activeStep = resolveStep(location.pathname);

  const completeStep = (step: CheckoutStep) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev : [...prev, step]
    );
  };

  if (activeStep !== "cart") {
    const missingStep = requiredBefore(activeStep).find(
      (step) => !completedSteps.includes(step)
    );

    if (missingStep) {
      return <Navigate to={`/checkout/${missingStep}`} replace />;
    }

    if (guardedSteps.has(activeStep) && lines.length === 0) {
      return <Navigate to="/cart" replace />;
    }
  }

  return (
    <CheckoutContext.Provider
      value={{ activeStep, completedSteps, completeStep }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;