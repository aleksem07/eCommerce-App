import { Product } from "@Services/product/product.types";

export interface ProductCardProps extends Product {
  onClick?: (e: Event) => void;
}
