import CartListItemComponent from "@Components/cart-list-item/cart-list-item";
import CartListView from "./cart-list.view";
import { LineItem } from "@Services/cart/cart.types";

export default class CartListComponent {
  private view: CartListView;
  private lineItems: LineItem[];

  constructor(lineItems: LineItem[]) {
    this.view = new CartListView();
    this.lineItems = lineItems;
  }

  init() {
    const cartListItems = this.lineItems.map((lineItem) =>
      new CartListItemComponent(lineItem).init()
    );

    return this.view.render(cartListItems);
  }
}
