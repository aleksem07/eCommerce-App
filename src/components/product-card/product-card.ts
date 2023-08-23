import ProductCardView from "./product-card.view";

export default class ProductCardComponent {
  private view: ProductCardView;

  constructor() {
    this.view = new ProductCardView();
  }

  init() {
    return this.view.render();
  }
}
