import { Link } from 'react-router-dom';
import styles from "./productSummary.module.scss";

type ProductImageProps = {
  src?: string;
  alt?: string;
  linkTo?: string;
};
function ProductImage({src, alt, linkTo}:ProductImageProps ) {
    const image = <img src={src} alt={alt} className={styles["product-summary__image"]} />
  return (
    <div className={styles["product-summary__col-left"]}>
        { linkTo ? <Link to={linkTo}>{image}</Link> : image}
        </div>
  )
}
export default ProductImage;