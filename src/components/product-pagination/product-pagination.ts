import ProductPaginationView from "./product-pagination.view";

export default class ProductPaginationComponent {
  private view: ProductPaginationView;
  private pageCurrent = 1;

  constructor() {
    this.view = new ProductPaginationView();

    this.view.prevPageListener(this.prevPageHandler.bind(this));
    this.view.nextPageListener(this.nextPageHandler.bind(this));

    this.view.hideArrow("prev");
  }

  private prevPageHandler(e: Event) {
    e.preventDefault();
    this.pageCurrent--;

    if (this.pageCurrent < 1) {
      this.pageCurrent = 1;
    }
    this.view.updatePageNumber(this.pageCurrent);

    if (this.pageCurrent === 1) {
      this.view.hideArrow("prev");
    } else {
      this.view.showArrow("prev");
    }
  }

  private nextPageHandler(e: Event) {
    e.preventDefault();
    this.pageCurrent++;
    this.view.updatePageNumber(this.pageCurrent);

    this.view.showArrow("prev");
  }

  init() {
    return this.view.render();
  }
}
