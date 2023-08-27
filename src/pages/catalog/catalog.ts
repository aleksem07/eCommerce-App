import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;
  private filter: FilterComponent;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();

    if (products) {
      const productListElement = this.productListComponent.init(products);
      this.view.displayProducts(productListElement);
      const colors = products.map((product) => product.color);
      const sizes = products.map((product) => product.size);
      eventBusService.publish(Events.fetchProductsSuccessfully, { colors, sizes });
    }
  }

  init() {
    this.view.displaySidebar(this.filter.init());
    this.fetchProducts();
    this.view.render();
  }
}
