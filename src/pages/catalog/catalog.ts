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
  sizeVariantAttribute = "";
  colorsFilter: string[] = [];
  colorVariantAttribute = "";
  priceRange: {
    minPrice: string;
    maxPrice: string;
  };

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();
    this.priceRange = {
      minPrice: "0",
      maxPrice: "*",
    };

    eventBusService.subscribe(Events.resetFiltersClick, this.handleResetFiltersClick.bind(this));
    eventBusService.subscribe(Events.minPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(Events.maxPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(
      Events.checkboxFilterClick,
      this.handleFilterEvent("size", this.sizesFilter)
    );
    eventBusService.subscribe(
      Events.colorFilterClick,
      this.handleFilterEvent("color", this.colorsFilter)
    );
  }

  private handleResetFiltersClick() {
    this.resetDataFilter();
    this.fetchProducts();
  }

  private resetDataFilter() {
    this.sizesFilter.length = 0;
    this.colorsFilter.length = 0;
  }

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

    this.sizeVariantAttribute =
      size && size.length > 0 ? `variants.attributes.size:${formatArray(size)}` : "";

    this.colorVariantAttribute =
      color && color.length > 0 ? `variants.attributes.color.key:${formatArray(color)}` : "";

    this.filterProducts(this.sizeVariantAttribute, this.colorVariantAttribute);
  }

  private handlePriceChange(data?: EventData) {
    if (data && typeof data.minValue === "string") {
      this.priceRange.minPrice = data.minValue;
      this.filterProducts(this.sizeVariantAttribute, this.colorVariantAttribute);
    }

    if (data && typeof data.maxValue === "string") {
      this.priceRange.maxPrice = data.maxValue;
      this.filterProducts(this.sizeVariantAttribute, this.colorVariantAttribute);
    }
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

  private getCurrentPriceRange() {
    return {
      minPrice: this.priceRange.minPrice,
      maxPrice: this.priceRange.maxPrice,
    };
  }

  private async filterProducts(size: string, color: string) {
    const priceRange = this.getCurrentPriceRange();
    const filterProducts = await this.productService.filterProducts(size, color, priceRange);

    if (filterProducts) {
      const productListElement = this.productListComponent.init(filterProducts);
      this.view.displayProducts(productListElement);
    }
  }

  init() {
    this.view.displaySidebar(this.filter.init());
    this.resetDataFilter();
    this.fetchProducts();
    this.view.render();
  }
}
