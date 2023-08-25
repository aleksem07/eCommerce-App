import { ProductCardProps } from "@Components/product-card/product-card.types";
import ProductInformationView from "./product-information.view";

export default class ProductInformationComponent {
  private view: ProductInformationView;

  constructor({ title, description, imageUrl, price, id }: ProductCardProps) {
    this.view = new ProductInformationView({ title, description, imageUrl, price, id });
  }

  init() {
    return this.view.render();
  }
}
