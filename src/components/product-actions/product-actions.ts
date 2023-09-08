import ProductActionsView from "./product-actions.view";

export default class ProductActionsComponent {
  private view: ProductActionsView;

  constructor() {
    this.view = new ProductActionsView();
  }

  init() {
    return this.view.render();
  }
}
