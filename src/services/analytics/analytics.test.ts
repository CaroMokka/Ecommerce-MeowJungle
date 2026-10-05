import { configureAnalytics, track } from "./analytics";

describe("analytics", () => {
  afterEach(() => {
    configureAnalytics();
  });

  it("no emite nada con la configuración por defecto", () => {
    const consoleLog = jest
      .spyOn(console, "log")
      .mockImplementation(() => undefined);

    track("add_to_cart", { productId: 1 });

    expect(consoleLog).not.toHaveBeenCalled();
    consoleLog.mockRestore();
  });

  it("envía el evento y el payload al logger configurado", () => {
    const logger = jest.fn();
    configureAnalytics(logger);

    track("add_to_cart", { productId: 1, quantity: 2 });

    expect(logger).toHaveBeenCalledWith("add_to_cart", {
      productId: 1,
      quantity: 2,
    });
  });

  it("permite emitir eventos sin payload", () => {
    const logger = jest.fn();
    configureAnalytics(logger);

    track("begin_checkout");

    expect(logger).toHaveBeenCalledWith("begin_checkout", undefined);
  });

  it("vuelve a noop al configurar sin logger", () => {
    const logger = jest.fn();
    configureAnalytics(logger);
    configureAnalytics();

    track("purchase", { orderNumber: "MJ-000123" });

    expect(logger).not.toHaveBeenCalled();
  });
});
