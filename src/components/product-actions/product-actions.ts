import CartService from "@Services/cart/cart";
import ProductActionsView from "./product-actions.view";

export default class ProductActionsComponent {
  private view: ProductActionsView;
  private cartService: CartService;
  private id: string;

  constructor(productId: string) {
    this.view = new ProductActionsView();
    this.cartService = new CartService();
    this.id = productId;
  }

  private async checkCartHasProduct(): Promise<boolean> {
    const cart = await this.cartService.getCart();

    return !!cart?.lineItems?.find((item) => item.productId === this.id);
  }

  async init() {
    const hasProduct = await this.checkCartHasProduct();

    return this.view.render(hasProduct);
  }
}
