import CartListItemComponent from "@Components/cart-list-item/cart-list-item";
import CartListView from "./cart-list.view";
import { Cart, LineItem } from "@Services/cart/cart.types";
import ProductPriceComponent from "@Components/product-price/product-price";
import CartEmptyHeadingComponent from "@Components/cart-empty-heading/cart-empty-heading";
import CartService from "@Services/cart/cart";

export default class CartListComponent {
  private view: CartListView;
  private lineItems: LineItem[];
  private totalPrice: ProductPriceComponent;
  private cart: Cart;
  private cartEmptyHeading: CartEmptyHeadingComponent;
  private cartService: CartService;

  constructor(cart: Cart) {
    this.view = new CartListView();
    this.cart = cart;
    this.lineItems = this.cart.lineItems;
    this.totalPrice = new ProductPriceComponent({ price: this.cart.totalPrice, classes: ["ms-2"] });
    this.cartEmptyHeading = new CartEmptyHeadingComponent();
    this.view.deleteButtonClickListener(this.deleteButtonClickHandler.bind(this));
    this.cartService = new CartService();
  }

  async deleteButtonClickHandler() {
    await this.cartService.removeAllFromCart();
  }

  init() {
    const cartListItems = this.lineItems.map((lineItem) => {
      return new CartListItemComponent(this.cart, lineItem).init();
    });

    if (this.lineItems.length === 0) {
      return this.view.render(cartListItems, this.totalPrice.init(), this.cartEmptyHeading.init());
    } else {
      return this.view.render(cartListItems, this.totalPrice.init());
    }
  }
}
