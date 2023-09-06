import CartListView from "./cart-list.view";

export default class CartListComponent {
  private view: CartListView;

  constructor() {
    this.view = new CartListView();
  }

  init() {
    return this.view.render();
  }
}
