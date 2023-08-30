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
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();

    if (products) {
      const productListElement = this.productListComponent.init(products);
      this.view.displayProducts(productListElement);
    }
  }

  init() {
    this.fetchProducts();
    this.view.render();
  }
}
