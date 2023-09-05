import ProductCardComponent from "@Components/product-card/product-card";
import ProductListView from "./product-list.view";
import { Product } from "@Services/product/product.types";

export default class ProductListComponent {
  private view: ProductListView;
  private productCards?: HTMLLinkElement[];
  private products?: Product[];
  // addToCartHandler: any;

  constructor() {
    this.view = new ProductListView();
  }

  addToCartHandler(e: Event) {
    const button = e.target as HTMLButtonElement;
    button.disabled = true;
  }

  init(products: Product[]) {
    this.products = products;
    this.productCards = this.products.map((product) =>
      new ProductCardComponent({ ...product, onClick: this.addToCartHandler.bind(this) }).init()
    );

    return this.view.render(...this.productCards);
  }
}
