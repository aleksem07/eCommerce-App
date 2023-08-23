import ProductCardComponent from "@Components/product-card/product-card";
import ProductListView from "./product-list.view";
import { Product } from "@Services/product/product.types";

export default class ProductListComponent {
  private view: ProductListView;
  private productCards?: HTMLDivElement[];
  private products: Product[];

  constructor(products: Product[]) {
    this.view = new ProductListView();

    this.products = products;
  }

  init() {
    this.productCards = this.products.map((product) => new ProductCardComponent(product).init());

    return this.view.render(...this.productCards);
  }
}
