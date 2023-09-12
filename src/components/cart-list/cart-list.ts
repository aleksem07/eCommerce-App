import CartListItemComponent from "@Components/cart-list-item/cart-list-item";
import CartListView from "./cart-list.view";
import { Cart, LineItem } from "@Services/cart/cart.types";
import ProductPriceComponent from "@Components/product-price/product-price";

export default class CartListComponent {
  private view: CartListView;
  private lineItems: LineItem[];
  private totalPrice: ProductPriceComponent;
  private cart: Cart;

  constructor(cart: Cart) {
    this.view = new CartListView();
    this.cart = cart;
    this.lineItems = this.cart.lineItems;
    this.totalPrice = new ProductPriceComponent({ price: this.cart.totalPrice, classes: ["ms-2"] });
  }

  init() {
    const cartListItems = this.lineItems.map((lineItem) =>
      new CartListItemComponent(this.cart, lineItem).init()
    );

    return this.view.render(cartListItems, this.totalPrice.init());
  }
}
