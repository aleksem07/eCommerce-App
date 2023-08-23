import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.fetchProducts();
  }

  private async fetchProducts() {
    await this.productService.getAll();
    // Здесь можно посмотреть товары через console.log()
  }

  init() {
    const list = this.productListComponent.init();
    this.view.render(list);
  }
}
