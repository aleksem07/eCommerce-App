import { Product } from "@Services/product/product.types";

export type ProductInformationProps = Product;

export interface ProductInformationElements {
  deliveryDetails: HTMLElement;
  returnDetails: HTMLElement;
  price: HTMLElement;
  imageSlider: HTMLElement;
  actions: HTMLElement;
}
