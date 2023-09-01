import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";
import { FilterAttributeType } from "./catalog.types";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
// import { Product } from "@commercetools/platform-sdk";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;
  private filter: FilterComponent;
  private sizesFilter: string[] = [];
  private sizeVariantAttribute = "";
  private colorsFilter: string[] = [];
  private colorVariantAttribute = "";
  private priceRange: {
    minPrice: string;
    maxPrice: string;
  };

  private id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any;

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();
    this.priceRange = {
      minPrice: "0",
      maxPrice: "*",
    };

    eventBusService.subscribe(Events.resetFilters, this.handleResetFiltersClick.bind(this));
    eventBusService.subscribe(Events.minPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(Events.maxPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(
      Events.filterBySize,
      this.handleFilterEvent(FilterAttributeType.size, this.sizesFilter)
    );
    eventBusService.subscribe(
      Events.filterByColor,
      this.handleFilterEvent(FilterAttributeType.color, this.colorsFilter)
    );
  }

  private handleResetFiltersClick() {
    this.resetPriceRange();
    this.resetDataFilter();
    this.fetchProducts();
  }

  private resetPriceRange() {
    this.priceRange.minPrice = "0";
    this.priceRange.maxPrice = "*";
  }

  private resetDataFilter() {
    this.sizesFilter.length = 0;
    this.colorsFilter.length = 0;
  }

  private handleFilterEvent(attribute: FilterAttributeType, elements: string[]) {
    return (data?: EventData) => {
      const hasAttribute = ObjectGuardUtil.hasProp<string>(data, attribute);

      if (data && hasAttribute) {
        const attributeValue = data[attribute] as string;

        if (!elements.includes(attributeValue)) {
          elements.push(attributeValue);
        } else {
          elements.splice(elements.indexOf(attributeValue), 1);
        }

        this.sendFiltersToProductService();
      }
    };
  }

  private sendFiltersToProductService() {
    const { sizeFilter, colorFilter } = this.productService.generateFilters(
      this.sizesFilter,
      this.colorsFilter
    );
    this.filterProducts(sizeFilter, colorFilter);
  }

  private handlePriceChange(data?: EventData) {
    const hasMinValue = ObjectGuardUtil.hasProp<string>(data, "minValue");
    const hasMaxValue = ObjectGuardUtil.hasProp<string>(data, "maxValue");

    if (hasMinValue) {
      this.priceRange.minPrice = data.minValue;
    }

    if (hasMaxValue) {
      this.priceRange.maxPrice = data.maxValue;
    }

    this.sendFiltersToProductService();
  }

  private async checkProductExists() {
    const [, ...rest] = window.location.href.split("-");
    this.id = rest.join("-");
    // eslint-disable-next-line no-console
    console.log("id", this.id);

    if (!this.id) {
      this.fetchProducts();
    } else {
      const products = await this.productService.getProductsByCategory(this.id);

      if (products) {
        const productListElement = this.productListComponent.init(products);
        this.view.displayProducts(productListElement);
      } else {
        RouterService.navigateTo(Routes.NOT_FOUND);
      }
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
    const filteredProducts = await this.productService.filterProducts(size, color, priceRange);

    if (filteredProducts) {
      const productListElement = this.productListComponent.init(filteredProducts);
      this.view.displayProducts(productListElement);
    }
  }

  init() {
    this.resetDataFilter();
    this.view.displaySidebar(this.filter.init());
    this.checkProductExists();
    this.view.render();
  }
}
