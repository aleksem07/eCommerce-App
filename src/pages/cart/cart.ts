import CartView from "./cart.view";

export default class CartPage {
  private view: CartView;

  constructor() {
    this.view = new CartView();
  }

  init() {
    this.view.render();
  }
}
