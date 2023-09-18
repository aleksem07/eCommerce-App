import SearchProductsView from "./search-products.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import RouterService from "@Services/router/router";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";
import { Routes } from "@Services/router/router.types";
import ProductService from "@Services/product/product";
import ProductListComponent from "@Components/product-list/product-list";

export default class SearchProductsPage {
  private view: SearchProductsView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;
  private CATALOG_PAGE_ID: string;

  constructor() {
    this.view = new SearchProductsView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.CATALOG_PAGE_ID = "#catalog-0580853f-c6c1-4b5a-8a1a-0cf545a29949";

    this.view.returnButtonListener((e) => this.returnButtonHandler(e));

    eventBusService.subscribe(Events.searchProducts, this.handleSearchChange.bind(this));
  }

  private handleSearchChange(data?: EventData) {
    RouterService.navigateTo(Routes.SEARCH);
    const hasSearchValue = ObjectGuardUtil.hasProp<string>(data, "searchValue");

    if (hasSearchValue) {
      this.searchProducts(data.searchValue);
    }
  }

  private async searchProducts(inputValue: string) {
    const searchProducts = await this.productService.searchProducts(inputValue);

    if (searchProducts) {
      const productListElement = this.productListComponent.init(searchProducts);
      const productList = await productListElement;
      this.view.displayProducts(productList);
    }
  }

  private returnButtonHandler(e: Event) {
    e.preventDefault();
    window.location.href = this.CATALOG_PAGE_ID;
  }

  init() {
    this.view.render();
  }
}
