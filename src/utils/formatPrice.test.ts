import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formatea montos menores a mil sin separador", () => {
    expect(formatPrice(999)).toBe("$999");
  });

  it("separa miles con punto (peso chileno) sin decimales", () => {
    expect(formatPrice(2999)).toBe("$2.999");
    expect(formatPrice(25000)).toBe("$25.000");
    expect(formatPrice(14450)).toBe("$14.450");
  });

  it("trunca decimales si los recibe", () => {
    expect(formatPrice(2999.99)).toBe("$2.999");
  });
});