import ProductInformationView from "./product-information.view";

export default class ProductInformationComponent {
  private view: ProductInformationView;

  constructor() {
    this.view = new ProductInformationView();
  }

  init() {
    return this.view.render();
  }
}
