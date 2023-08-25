import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import SortComponent from "@Components/sort/sort";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent?: ProductListComponent;
  private filter: FilterComponent;
  private sort: SortComponent;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.filter = new FilterComponent();
    this.sort = new SortComponent();
  }

  private async fetchProducts() {
    const products = await this.productService.getAll();

    if (products) {
      this.productListComponent = new ProductListComponent(products);
      this.view.displayProducts(this.productListComponent.init());
    }
  }

  init() {
    this.view.displayProducts(this.filter.init());
    this.view.displayProducts(this.sort.init());
    this.fetchProducts();
    this.view.render();
  }
}
