import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VariantSelector from "./VariantSelector";
import { ProductVariant } from "../../../types/Product";

const variants: ProductVariant[] = [
  { id: "vela-180g", name: "180 g", priceModifier: 0, stock: 40 },
  { id: "vela-400g", name: "400 g", priceModifier: 1500, stock: 0 },
];

describe("VariantSelector", () => {
  it("muestra una opción por variante", () => {
    render(
      <VariantSelector
        variants={variants}
        selectedId="vela-180g"
        onSelect={jest.fn()}
      />
    );

    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("marca como seleccionada la variante recibida", () => {
    render(
      <VariantSelector
        variants={variants}
        selectedId="vela-400g"
        onSelect={jest.fn()}
      />
    );

    expect(screen.getByRole("radio", { name: /400 g/ })).toBeChecked();
  });

  it("devuelve la variante elegida al seleccionarla", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <VariantSelector
        variants={variants}
        selectedId="vela-400g"
        onSelect={onSelect}
      />
    );

    await user.click(screen.getByRole("radio", { name: /180 g/ }));

    expect(onSelect).toHaveBeenCalledWith(variants[0]);
  });

  it("deshabilita y marca como agotada la variante sin stock", () => {
    render(
      <VariantSelector
        variants={variants}
        selectedId="vela-180g"
        onSelect={jest.fn()}
      />
    );

    const agotada = screen.getByRole("radio", { name: /400 g \(agotado\)/ });
    expect(agotada).toBeDisabled();
  });
});
