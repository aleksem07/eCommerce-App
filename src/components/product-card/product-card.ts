import { ProductCardProps } from "./product-card.types";
import ProductCardView from "./product-card.view";

export default class ProductCardComponent {
  private view: ProductCardView;

  constructor({ title, description, imageUrl, color }: ProductCardProps) {
    this.view = new ProductCardView({ title, description, imageUrl, color });
  }

  init() {
    return this.view.render();
  }
}
