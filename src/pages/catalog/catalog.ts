import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;
  private filter: FilterComponent;
  sizesFilter: string[] = [];
  colorsFilter: string[] = [];

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();

    eventBusService.subscribe(Events.resetFiltersClick, this.handleResetFiltersClick.bind(this));
    eventBusService.subscribe(
      Events.checkboxFilterClick,
      this.handleFilterEvent("size", this.sizesFilter)
    );
    eventBusService.subscribe(
      Events.colorFilterClick,
      this.handleFilterEvent("color", this.colorsFilter)
    );
  }

  private handleResetFiltersClick = () => {
    this.sizesFilter.length = 0;
    this.colorsFilter.length = 0;
    this.fetchProducts();
  };

  private handleFilterEvent(attribute: "size" | "color", elements: string[]) {
    return (data?: EventData) => {
      if (data && typeof data[attribute] === "string") {
        const attributeValue = data[attribute] as string;

        if (!elements.includes(attributeValue)) {
          elements.push(attributeValue);
        } else {
          elements.splice(elements.indexOf(attributeValue), 1);
        }

        this.requestGenerationFilter(this.sizesFilter, this.colorsFilter);
      }
    };
  }

  private requestGenerationFilter(size: string[], color: string[]) {
    const formatArray = (arr: string[]) => arr.map((item) => `"${item.trim()}"`).join(", ");

    const sizeFilter =
      size && size.length > 0 ? `variants.attributes.size:${formatArray(size)}` : "";

    const colorFilter =
      color && color.length > 0 ? `variants.attributes.color.key:${formatArray(color)}` : "";

    this.filterProducts(sizeFilter, colorFilter);
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

  private async filterProducts(size: string, color: string) {
    const filterProducts = await this.productService.filterProducts(size, color);

    if (filterProducts) {
      const productListElement = this.productListComponent.init(filterProducts);
      this.view.displayProducts(productListElement);
    }
  }

  init() {
    this.view.displaySidebar(this.filter.init());
    this.fetchProducts();
    this.view.render();
  }
}
