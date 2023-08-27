import { Price } from "@Services/product/product.types";

export type ProductPriceSize = "sm" | "md";

export interface ProductPriceProps {
  price: Price;
  discountedPrice?: Price;
  size?: ProductPriceSize;
}
