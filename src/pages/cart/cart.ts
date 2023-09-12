import CartListComponent from "@Components/cart-list/cart-list";
import CartView from "./cart.view";
import { Cart } from "@Services/cart/cart.types";
import CartService from "@Services/cart/cart";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class CartPage {
  private view: CartView;
  private cartList?: CartListComponent;
  private cartService: CartService;
  private cart?: Cart;

  constructor() {
    this.view = new CartView();
    this.cartService = new CartService();

    eventBusService.subscribe(Events.updateCart, this.init.bind(this));
  }

  private async fetchCart() {
    this.cart = await this.cartService.getCart();

    if (this.cart) {
      this.cartList = new CartListComponent(this.cart);
    }
  }

  async init() {
    await this.fetchCart();

    if (this.cartList) {
      this.view.render(this.cartList.init());
    }
  }
}
