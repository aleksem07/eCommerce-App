import ProductCardComponent from "@Components/product-card/product-card";
import ProductListView from "./product-list.view";
import { Product } from "@Services/product/product.types";
import CartService from "@Services/cart/cart";

export default class ProductListComponent {
  private view: ProductListView;
  private productCards?: HTMLLinkElement[];
  private products?: Product[];
  private cartService: CartService;
  constructor() {
    this.view = new ProductListView();
    this.cartService = new CartService();
  }

  async addToCartHandler(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const button = e.target as HTMLButtonElement;
    button.disabled = true;
    const productId = button.dataset.productId;

    if (productId) {
      await this.cartService.addToCart(productId);
    }
  }

  async init(products: Product[]) {
    this.products = products;
    this.productCards = await Promise.all(
      this.products.map(
        async (product) =>
          await new ProductCardComponent({
            ...product,
            onClick: this.addToCartHandler.bind(this),
          }).init()
      )
    );

    return this.view.render(...this.productCards);
  }
}
