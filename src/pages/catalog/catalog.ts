import ProductService from "@Services/product/product";
import ProductFilterService from "@Services/product-filter/product-filter";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import SortComponent from "@Components/sort/sort";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productFilterService: ProductFilterService;
  private productListComponent: ProductListComponent;
  private filter: FilterComponent;
  private sort: SortComponent;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productFilterService = new ProductFilterService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();
    this.sort = new SortComponent();
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();

    if (products) {
      const productListElement = this.productListComponent.init(products);
      this.view.displayProducts(productListElement);
      const colors = products.map((product) => product.color);
      const sizes = products.map((product) => product.size);
      eventBusService.publish(Events.dataProductReceived, { colors, sizes });
    }
  }

  private async fetchFilteredProducts() {
    const productsFiltered = await this.productFilterService.getFiltered();

    if (productsFiltered) {
      const productListElement = this.productListComponent.init(productsFiltered);
      this.view.displayProducts(productListElement);
    }
  }

  private renderFilteredProducts() {
    this.fetchFilteredProducts();
  }

  init() {
    this.view.displaySidebar(this.filter.init());
    this.view.displayToolbar(this.sort.init());
    this.fetchProducts();
    this.view.render();
  }
}
