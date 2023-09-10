import CartService from "@Services/cart/cart";
import ProductActionsView from "./product-actions.view";

export default class ProductActionsComponent {
  private view: ProductActionsView;
  private cartService: CartService;
  private productId: string;
  private lineItemId?: string;

  constructor(productId: string) {
    this.view = new ProductActionsView();
    this.cartService = new CartService();
    this.productId = productId;

    this.view.addToCartListener(this.addToCartHandler.bind(this));
    this.view.removeFromCartListener(this.removeFromCartHandler.bind(this));
  }

  private async checkCartHasProduct(): Promise<boolean> {
    const cart = await this.cartService.getCart();

    const lineItem = cart?.lineItems?.find((item) => item.productId === this.productId);
    this.lineItemId = lineItem?.id;

    return !!lineItem;
  }

  private async addToCartHandler() {
    const cart = await this.cartService.addToCart(this.productId);

    if (cart) {
      await this.init();
    }
  }

  private async removeFromCartHandler() {
    if (this.lineItemId) {
      const cart = await this.cartService.removeFromCart(this.lineItemId);

      if (cart) {
        await this.init();
      }
    }
  }

  async init() {
    const hasProduct = await this.checkCartHasProduct();

    return this.view.render(hasProduct);
  }
}
