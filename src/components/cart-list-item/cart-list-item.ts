import CartListItemView from "./cart-list-item.view";

export default class CartListItemComponent {
  private view: CartListItemView;

  constructor(imageUrl: string, itemName: string) {
    this.view = new CartListItemView(imageUrl, itemName);
  }

  init() {
    return this.view.render();
  }
}
