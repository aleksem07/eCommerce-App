import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent?: ProductListComponent;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();

    if (products) {
      this.productListComponent = new ProductListComponent(products);
      this.view.displayProducts(this.productListComponent.init());
    }
  }

  init() {
    this.fetchProducts();
    this.view.render();
  }
}
