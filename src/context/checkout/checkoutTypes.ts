export const CHECKOUT_STEPS = [
  "profile",
  "shipping",
  "payment",
  "confirmation",
] as const;

export type CheckoutStep = "cart" | (typeof CHECKOUT_STEPS)[number];

const STEP_BY_PATH: Record<string, CheckoutStep> = {
  "/cart": "cart",
  "/checkout/profile": "profile",
  "/checkout/shipping": "shipping",
  "/checkout/payment": "payment",
  "/checkout/confirmation": "confirmation",
};

export const resolveStep = (pathname: string): CheckoutStep =>
  STEP_BY_PATH[pathname] ?? "cart";

const checkoutSteps = CHECKOUT_STEPS as readonly CheckoutStep[];

export const isCheckoutStep = (value: unknown): value is CheckoutStep =>
  typeof value === "string" &&
  (value === "cart" || checkoutSteps.includes(value as CheckoutStep));