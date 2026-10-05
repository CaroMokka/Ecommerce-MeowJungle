import { ReactNode } from "react";
import { Product } from "../../../types/Product";

export type ProductSummaryVariant = "pdp" | "minicart" | "shelf";
export interface ProductSummaryProps {
    product: Product;
    variant?: ProductSummaryVariant;
    onClick?: () => void;
    variantId?: string;
}
export interface ProductInfoProps {
    product: Product;
    variant?: ProductSummaryVariant;
    onClick?: () => void;
    unitPrice?: number;
    addDisabled?: boolean;
    variantId?: string;
    children?: ReactNode;
}
export interface MinicartItemProps {
    product: Product;
    onClick?: () => void;
}