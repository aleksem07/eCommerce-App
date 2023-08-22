import ProductView from "./product.view";

export default class ProductPage {
  private view: ProductView;

  constructor() {
    this.view = new ProductView();
  }

  init() {
    this.view.render();
  }
}
