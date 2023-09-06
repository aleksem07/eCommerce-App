import ProductPaginationView from "./product-pagination.view";

export default class ProductPaginationComponent {
  private view: ProductPaginationView;

  constructor() {
    this.view = new ProductPaginationView();
  }

  init() {
    return this.view.render();
  }
}
