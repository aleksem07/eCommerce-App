import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";

export default class CatalogPage {
  private view: CatalogView;
  productService: ProductService;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productService.getAll();
  }

  init() {
    this.view.render();
  }
}
