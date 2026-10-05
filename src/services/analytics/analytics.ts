export type AnalyticsEvent =
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase";

export type AnalyticsPayload = Record<
  string,
  string | number | boolean | undefined
>;

export type AnalyticsLogger = (
  event: AnalyticsEvent,
  payload?: AnalyticsPayload
) => void;

const noopLogger: AnalyticsLogger = () => undefined;

let logger: AnalyticsLogger = noopLogger;

export const configureAnalytics = (nextLogger?: AnalyticsLogger): void => {
  logger = nextLogger ?? noopLogger;
};

export const track = (
  event: AnalyticsEvent,
  payload?: AnalyticsPayload
): void => {
  logger(event, payload);
};
