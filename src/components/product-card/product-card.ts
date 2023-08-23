import { ProductCardProps } from "./product-card.types";
import ProductCardView from "./product-card.view";

export default class ProductCardComponent {
  private view: ProductCardView;

  constructor({ title, description, imageUrl }: ProductCardProps) {
    this.view = new ProductCardView({ title, description, imageUrl });
  }

  init() {
    return this.view.render();
  }
}
