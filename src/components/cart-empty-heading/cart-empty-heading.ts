import CartEmptyHeadingView from "./cart-empty-heading.view";

export default class CartEmptyHeadingComponent {
  private view: CartEmptyHeadingView;

  constructor() {
    this.view = new CartEmptyHeadingView();
  }

  init() {
    return this.view.render();
  }
}
