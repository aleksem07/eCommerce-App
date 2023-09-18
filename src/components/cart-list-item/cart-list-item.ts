import ProductPriceComponent from "@Components/product-price/product-price";
import CartListItemView from "./cart-list-item.view";
import { Cart, LineItem } from "@Services/cart/cart.types";
import CartService from "@Services/cart/cart";

export default class CartListItemComponent {
  private view: CartListItemView;
  private productPrice: ProductPriceComponent;
  private totalPrice: ProductPriceComponent;
  private cartService: CartService;
  private lineItem: LineItem;
  private cart: Cart;

  constructor(cart: Cart, lineItem: LineItem) {
    this.lineItem = lineItem;
    this.cart = cart;
    this.view = new CartListItemView(this.lineItem);
    this.cartService = new CartService();
    this.totalPrice = new ProductPriceComponent({
      price: this.lineItem.totalPrice,
      size: "md",
      classes: ["justify-content-center"],
    });
    this.productPrice = new ProductPriceComponent({
      price: this.lineItem.price,
      discountedPrice: this.lineItem.discountedPrice,
      classes: ["mt-2"],
    });

    this.view.inputChangeListener(this.inputChangeHandler.bind(this));
    this.view.deleteButtonClickListener(this.deleteButtonClickHandler.bind(this));
  }

  async inputChangeHandler(quantity: number) {
    await this.cartService.updateListItemQuantity(this.cart, this.lineItem.id, quantity);
  }

  async deleteButtonClickHandler() {
    await this.cartService.removeFromCart(this.lineItem.id);
  }

  init() {
    const price = this.productPrice.init();
    const total = this.totalPrice.init();

    return this.view.render(price, total);
  }
}
