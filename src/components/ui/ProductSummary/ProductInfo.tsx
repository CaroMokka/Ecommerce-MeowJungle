import TagList from "./TagList";
import BuyButton from "./BuyButton";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import useProductCart  from "../../../hooks/useProductCart";
import styles from "./productSummary.module.scss";
import { ProductInfoProps } from "./types";


function ProductInfo({ product, variant }: ProductInfoProps) {
  const { quantity, subTotal, changeQuantity} = useProductCart(product.price ?? 0, 1);



  
  return (
    <div className={styles["product-summary__col-right"]}>
      <div className={styles["product-summary__content"]}>
        <h3 className={styles["product-summary__name"]}>{product.name}</h3>
        <h5 className={styles["product-summary__brand"]}>{product.brand}</h5>

        {variant === "pdp" && (
          <>
            <TagList tags={product.tags} />
            <p className={styles["product-summary__description"]}>
              {product.description}
            </p>
          </>
        )}

        <ProductPrice unitPrice={product.price} />

        {(variant === "pdp" || variant === "shelf") && (
         <BuyButton product={product} />
        )}
        {variant === "minicart" && (
          <>
          <ProductQuantity
            quantity={quantity ?? 1}
            onChange={changeQuantity}
          />
          {
            quantity > 1 && (<ProductPrice subTotalPrice={subTotal} />)
          }
          </>
          
)}
      </div>
    </div>
  );
}
export default ProductInfo;
