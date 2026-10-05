import { useState } from "react";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import ProductInfo from "../ProductSummary/ProductInfo";
import { Product } from "../../../types/Product";

type ProductDetailProps = {
  product: Product;
};

function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id ?? ""
  );
  const selectedVariant =
    product.variants?.find((variant) => variant.id === selectedVariantId) ??
    product.variants?.[0] ??
    null;
  const unitPrice = product.price + (selectedVariant?.priceModifier ?? 0);
  const soldOut = selectedVariant !== null && selectedVariant.stock === 0;

  return (
    <article className="product-detail">
      <ProductBreadcrumb product={product} />

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <ProductGallery product={product} />
        </div>

        <div className="col-12 col-md-6">
          <ProductInfo
            product={product}
            variant="pdp"
            unitPrice={unitPrice}
            addDisabled={soldOut}
          >
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                selectedId={selectedVariant?.id ?? ""}
                onSelect={(variant) => setSelectedVariantId(variant.id)}
              />
            )}
          </ProductInfo>
        </div>
      </div>
    </article>
  );
}

export default ProductDetail;
