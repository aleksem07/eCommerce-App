import CartListComponent from "@Components/cart-list/cart-list";
import CartView from "./cart.view";

export default class CartPage {
  private view: CartView;
  private cartList: CartListComponent;

  constructor() {
    this.view = new CartView();
    this.cartList = new CartListComponent("", "");
  }

  init() {
    const cartList = this.cartList.init();
    this.view.render(cartList);
  }
}
