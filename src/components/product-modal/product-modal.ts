import ProductModalView from "./product-modal.view";

export default class ProductModalComponent {
  private view: ProductModalView;

  constructor() {
    this.view = new ProductModalView();
  }

  init() {
    return this.view.render();
  }
}
