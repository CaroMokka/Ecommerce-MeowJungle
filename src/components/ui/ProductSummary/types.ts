import { Product } from "../../../types/Product";

export type ProductSummaryVariant = "pdp" | "minicart" | "shelf";
export interface ProductSummaryProps {
    product: Product;
    variant?: ProductSummaryVariant;
    onClick?: () => void;
}
export interface ProductInfoProps {
    product: Product;
    variant?: ProductSummaryVariant;
    onClick?: () => void;
}