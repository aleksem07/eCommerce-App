import { Price } from "@Services/product/product.types";

export type ProductCardProps = {
  title: string;
  description: string;
  images: string[];
  price: Price;
  discountedPrice?: Price;
  id: string;
  onClick?: (e: Event) => void;
  color?: string;
  size?: string;
};
