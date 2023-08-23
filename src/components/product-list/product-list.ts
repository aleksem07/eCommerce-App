import ProductListView from "./product-list.view";

export default class ProductListComponent {
  private view: ProductListView;

  constructor() {
    this.view = new ProductListView();
  }

  init() {
    return this.view.render();
  }
}
