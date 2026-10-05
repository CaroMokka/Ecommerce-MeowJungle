import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCart from "../cart/useCart";
import { CartLine } from "../../services/cart/cartLines";
import { Order, createOrder } from "../../services/order/order";
import { track } from "../../services/analytics/analytics";
import {
  CheckoutStep,
  CHECKOUT_STEPS,
  isCheckoutStep,
  resolveStep,
} from "./checkoutTypes";

const guardedSteps: ReadonlySet<CheckoutStep> = new Set([
  "profile",
  "shipping",
  "payment",
]);

const checkoutSteps = CHECKOUT_STEPS as readonly CheckoutStep[];

const STEPS_KEY = "checkoutSteps";
const ORDER_KEY = "checkoutOrder";

const requiredBefore = (step: CheckoutStep): CheckoutStep[] => {
  const index = checkoutSteps.indexOf(step);
  return index > 0 ? checkoutSteps.slice(0, index) : [];
};

const loadCompletedSteps = (fallback: CheckoutStep[]): CheckoutStep[] => {
  const raw = sessionStorage.getItem(STEPS_KEY);
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return fallback;
    const valid = parsed.filter(isCheckoutStep);
    return valid.length > 0 ? valid : fallback;
  } catch {
    return fallback;
  }
};

const loadOrder = (): Order | null => {
  const raw = sessionStorage.getItem(ORDER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Order>;
    if (
      typeof parsed.id !== "string" ||
      typeof parsed.itemCount !== "number" ||
      typeof parsed.subtotal !== "number" ||
      !Array.isArray(parsed.lines)
    ) {
      return null;
    }
    return parsed as Order;
  } catch {
    return null;
  }
};

type CheckoutContextValue = {
  activeStep: CheckoutStep;
  completedSteps: Readonly<CheckoutStep[]>;
  completeStep: (step: CheckoutStep) => void;
  order: Order | null;
  placeOrder: (lines: CartLine[]) => Order;
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
  const [completedSteps, setCompletedSteps] = useState<CheckoutStep[]>(() =>
    loadCompletedSteps(initialCompletedSteps)
  );
  const [order, setOrder] = useState<Order | null>(() => loadOrder());

  const activeStep = resolveStep(location.pathname);

  const completeStep = (step: CheckoutStep) => {
    setCompletedSteps((prev) => {
      if (prev.includes(step)) return prev;
      const next = [...prev, step];
      sessionStorage.setItem(STEPS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const placeOrder = (orderLines: CartLine[]): Order => {
    const nextOrder = createOrder(orderLines);
    setOrder(nextOrder);
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(nextOrder));
    track("purchase", {
      orderId: nextOrder.id,
      itemCount: nextOrder.itemCount,
      subtotal: nextOrder.subtotal,
    });
    return nextOrder;
  };

  const missingStep =
    activeStep !== "cart"
      ? requiredBefore(activeStep).find(
          (step) => !completedSteps.includes(step)
        )
      : undefined;

  const blockedByEmptyCart =
    activeStep !== "cart" && guardedSteps.has(activeStep) && lines.length === 0;

  const trackedBeginCheckout = useRef(false);

  useEffect(() => {
    if (activeStep !== "profile" || missingStep || blockedByEmptyCart) return;
    if (trackedBeginCheckout.current) return;
    trackedBeginCheckout.current = true;
    track("begin_checkout");
  }, [activeStep, missingStep, blockedByEmptyCart]);

  if (missingStep) {
    return <Navigate to={`/checkout/${missingStep}`} replace />;
  }

  if (blockedByEmptyCart) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <CheckoutContext.Provider
      value={{ activeStep, completedSteps, completeStep, order, placeOrder }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;