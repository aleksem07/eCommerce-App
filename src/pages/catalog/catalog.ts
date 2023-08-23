import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.fetchProducts();
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();
    // Здесь можно посмотреть товары через console.log()
  }

  init() {
    this.view.render();
  }
}
