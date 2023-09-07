import ProductCardComponent from "@Components/product-card/product-card";
import ProductListView from "./product-list.view";
import { Product } from "@Services/product/product.types";
import CartService from "@Services/cart/cart";
import { USERNAME_ID } from "@Services/auth/auth.types";

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
    console.log("ADD product", productId);

    if (productId) {
      this.cartService.addToCart(productId);
    }
    const cartID = localStorage.getItem(USERNAME_ID);
    console.log("cartID", cartID);

    if (cartID) {
      const cart = await this.cartService.getCartById(cartID);
      console.log(cart);
    }
  }

  init(products: Product[]) {
    this.products = products;
    this.productCards = this.products.map((product) =>
      new ProductCardComponent({ ...product, onClick: this.addToCartHandler.bind(this) }).init()
    );

    return this.view.render(...this.productCards);
  }
}
