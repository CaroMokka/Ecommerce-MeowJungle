import { useId } from "react";
import { ProductVariant } from "../../../types/Product";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (variant: ProductVariant) => void;
};

function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  const groupName = useId();

  return (
    <fieldset className="mt-3">
      <legend className="form-label fs-6 fw-semibold">Elige una opción</legend>
      {variants.map((variant) => {
        const soldOut = variant.stock === 0;
        return (
          <label
            key={variant.id}
            className="d-inline-flex align-items-center gap-2 me-4"
          >
            <input
              type="radio"
              name={groupName}
              value={variant.id}
              checked={selectedId === variant.id}
              onChange={() => onSelect(variant)}
              disabled={soldOut}
            />
            <span>
              {variant.name}
              {soldOut && " (agotado)"}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

export default VariantSelector;
