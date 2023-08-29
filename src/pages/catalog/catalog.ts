import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
// import { Product } from "@commercetools/platform-sdk";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;
  private id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
  }

  private async checkProductExists() {
    const [, ...rest] = window.location.href.split("-");
    this.id = rest.join("-");
    // eslint-disable-next-line no-console
    console.log("id", this.id);

    if (!this.id) {
      this.fetchProducts();
    } else {
      const products = await this.productService.getProductsByCategory(this.id);

      if (products) {
        const productListElement = this.productListComponent.init(products);
        this.view.displayProducts(productListElement);
      } else {
        RouterService.navigateTo(Routes.NOT_FOUND);
      }
    }
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();

    if (products) {
      const productListElement = this.productListComponent.init(products);
      this.view.displayProducts(productListElement);
    }
  }

  init() {
    this.checkProductExists();
    this.view.render();
  }
}
