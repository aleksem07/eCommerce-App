import ProductService from "@Services/product/product";
import CatalogView from "./catalog.view";
import ProductListComponent from "@Components/product-list/product-list";
import FilterComponent from "@Components/filter/filter";
import SortComponent from "@Components/sort/sort";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";
import { FilterAttributeType } from "./catalog.types";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import { NotificationVariant } from "@Components/notification/notification.types";
import CategoryService from "@Services/category/category";
import BreadCrumbsComponent from "@Components/bread-crumbs/bread-crumbs";
import ProductPaginationComponent from "@Components/product-pagination/product-pagination";

export default class CatalogPage {
  private view: CatalogView;
  private breadcrumbs: BreadCrumbsComponent;
  private productService: ProductService;
  private categoryService: CategoryService;
  private productListComponent: ProductListComponent;
  private filter: FilterComponent;
  private sort: SortComponent;
  private pagination: ProductPaginationComponent;
  private sizesFilter: string[] = [];
  private colorsFilter: string[] = [];
  private sortValue = "";
  private priceRange: {
    minPrice: string;
    maxPrice: string;
  };

  private id?: string;

  constructor() {
    this.view = new CatalogView();
    this.breadcrumbs = new BreadCrumbsComponent();
    this.productService = new ProductService();
    this.categoryService = new CategoryService();
    this.productListComponent = new ProductListComponent();
    this.filter = new FilterComponent();
    this.sort = new SortComponent();
    this.pagination = new ProductPaginationComponent();
    this.priceRange = {
      minPrice: "0",
      maxPrice: "*",
    };

    eventBusService.subscribe(Events.resetFilters, this.handleResetFiltersClick.bind(this));
    eventBusService.subscribe(Events.minPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(Events.maxPriceFilterValue, this.handlePriceChange.bind(this));
    eventBusService.subscribe(Events.sortProducts, this.handleSortProducts.bind(this));
    eventBusService.subscribe(Events.pageSwitch, this.pageSwitch.bind(this));
    eventBusService.subscribe(
      Events.filterBySize,
      this.handleFilterEvent(FilterAttributeType.size, this.sizesFilter)
    );
    eventBusService.subscribe(
      Events.filterByColor,
      this.handleFilterEvent(FilterAttributeType.color, this.colorsFilter)
    );
  }

  private async handleResetFiltersClick() {
    this.resetPriceRange();
    this.resetDataFilter();
    await this.fetchFilters();
    const { sizeFilter, colorFilter } = this.productService.generateFilters(
      this.sizesFilter,
      this.colorsFilter
    );
    this.filterProducts(sizeFilter, colorFilter, this.sortValue);
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

      if (hasAttribute) {
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
    this.filterProducts(sizeFilter, colorFilter, this.sortValue);
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

  private async checkCategoryExists(offset?: number) {
    const [, ...rest] = window.location.href.split("-");
    this.id = rest.join("-");
    const PRODUCT_PER_PAGE = 6;

    if (!this.id) {
      RouterService.navigateTo(Routes.NOT_FOUND);
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.info,
        message: "Category not found",
      });
    } else {
      const category = await this.categoryService.getById(this.id);
      const products = await this.productService.getProductsByCategory(
        this.id,
        offset,
        PRODUCT_PER_PAGE
      );

      if (category) {
        this.view.displayHeader(category.name);
      }

      if (products) {
        const productListElement = this.productListComponent.init(products);
        this.view.displayProducts(await productListElement);
      } else {
        RouterService.navigateTo(Routes.NOT_FOUND);
      }
    }
  }

  private getCurrentPriceRange() {
    return {
      minPrice: this.priceRange.minPrice,
      maxPrice: this.priceRange.maxPrice,
    };
  }

  private async filterProducts(size: string, color: string, sort: string) {
    const priceRange = this.getCurrentPriceRange();
    const filteredProducts = await this.productService.filterProducts({
      size,
      color,
      priceRange,
      sort,
      categoryId: this.id,
    });

    if (filteredProducts) {
      const productListElement = this.productListComponent.init(filteredProducts);
      this.view.displayProducts(await productListElement);
    }
  }

  private async fetchFilters() {
    const [, ...rest] = window.location.href.split("-");
    this.id = rest.join("-");
    const filters = await this.productService.getProductsByCategory(this.id);

    if (filters) {
      const filterListElement = this.productListComponent.init(filters);
      this.view.displayProducts(await filterListElement);
      const colors = filters.map((filter) => filter.color);
      const sizes = filters.map((filter) => filter.size);
      eventBusService.publish(Events.fetchProductsSuccessfully, { colors, sizes });
      const productsInCategory = filters.length;
      eventBusService.publish(Events.getAllProductsInCategory, { productsInCategory });
    }
  }

  private handleSortProducts(data?: EventData) {
    const hasSelectedValue = ObjectGuardUtil.hasProp<string>(data, "selectValue");

    if (hasSelectedValue) {
      this.sortValue = data.selectValue;
      const { sizeFilter, colorFilter } = this.productService.generateFilters(
        this.sizesFilter,
        this.colorsFilter
      );

      this.filterProducts(sizeFilter, colorFilter, this.sortValue);
    }
  }

  private async pageSwitch(data?: EventData) {
    const hasPage = ObjectGuardUtil.hasProp<number>(data, "page");
    const STEP_SWITCH_PAGE = 6;

    if (hasPage) {
      let offset = 0;
      data.page === 1 ? (offset = 0) : (offset = data.page * STEP_SWITCH_PAGE);
      await this.checkCategoryExists(offset);
    }
  }

  init() {
    this.resetDataFilter();
    this.view.displayToolbar(this.sort.init(), this.pagination.init());
    this.view.displaySidebar(this.filter.init());
    this.fetchFilters();
    this.checkCategoryExists();
    this.breadcrumbs.init();
    this.view.render();
  }
}
