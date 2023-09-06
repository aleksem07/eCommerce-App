import CartListItemComponent from "@Components/cart-list-item/cart-list-item";
import CartListView from "./cart-list.view";

export default class CartListComponent {
  private view: CartListView;
  private cartListItems: CartListItemComponent;

  constructor(imageUrl: string, itemName: string) {
    this.view = new CartListView();
    this.cartListItems = new CartListItemComponent(imageUrl, itemName);
  }

  init() {
    const cartListItems = this.cartListItems.init();

    return this.view.render(cartListItems);
  }
}
