import { Link } from "react-router-dom";
import styles from "./productSummary.module.scss";

function BuyButton({ to, onClick }: { to: string; onClick?: () => void }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={styles["product-summary__buy-button"]}
        >
            Add to cart
        </Link>
    )
}
export default BuyButton;