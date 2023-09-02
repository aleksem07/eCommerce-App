import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import SortComponent from "@Components/sort/sort";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";
import { FilterAttributeType } from "./catalog.types";

export default class CatalogPage {
  private view: CatalogView;
  private productService: ProductService;
  private productListComponent: ProductListComponent;
  private filter: FilterComponent;
  private sort: SortComponent;
  private sizesFilter: string[] = [];
  private colorsFilter: string[] = [];
  private priceRange: {
    minPrice: string;
    maxPrice: string;
  };

  constructor() {
    this.view = new CatalogView();
    this.productService = new ProductService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();
    this.sort = new SortComponent();
    this.priceRange = {
      minPrice: "0",
      maxPrice: "*",
    };

    eventBusService.subscribe(Events.resetFilters, this.handleResetFiltersClick.bind(this));
    eventBusService.subscribe(Events.minPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(Events.maxPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(Events.sortProducts, this.handleSortProducts.bind(this));
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

  private async filterProducts(size: string, color: string, sort?: string) {
    const priceRange = this.getCurrentPriceRange();
    const filteredProducts = await this.productService.filterProducts(
      { size, color },
      priceRange,
      sort
    );

    if (filteredProducts) {
      const productListElement = this.productListComponent.init(filteredProducts);
      this.view.displayProducts(productListElement);
    }
  }

  private handleSortProducts(data?: EventData) {
    const hasSelectedValue = ObjectGuardUtil.hasProp<string>(data, "selectValue");

    if (hasSelectedValue) {
      const selectSort = data.selectValue;
      const { sizeFilter, colorFilter } = this.productService.generateFilters(
        this.sizesFilter,
        this.colorsFilter
      );

      this.filterProducts(sizeFilter, colorFilter, selectSort.toString());
    }
  }

  init() {
    this.resetDataFilter();
    this.view.displayToolbar(this.sort.init());
    this.view.displaySidebar(this.filter.init());
    this.fetchProducts();
    this.view.render();
  }
}
