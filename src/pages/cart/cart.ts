import CartListComponent from "@Components/cart-list/cart-list";
import CartView from "./cart.view";
import { Cart } from "@Services/cart/cart.types";
import CartService from "@Services/cart/cart";

export default class CartPage {
  private view: CartView;
  private cartList: CartListComponent;
  private cartService: CartService;
  private cart?: Cart;

  constructor() {
    this.view = new CartView();
    this.cartService = new CartService();

    this.cartList = new CartListComponent("", "");
  }

  private async fetchCart() {
    this.cart = await this.cartService.getCart();
  }

  init() {
    const cartList = this.cartList.init();
    this.view.render(cartList);
  }
}
