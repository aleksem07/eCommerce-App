import CartIconView from "./cart-icon.view";

export default class CartIconComponent {
  private view: CartIconView;

  constructor() {
    this.view = new CartIconView();
  }

  init() {
    return this.view.render();
  }
}
