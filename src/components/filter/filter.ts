import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";
import ProductService from "@Services/product/product";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";

export default class FilterComponent {
  private view: FilterView;
  filteredColors: Set<string>;
  filteredSizes: Set<string>;
  private uniqueColors: string[] = [];
  private uniqueSizes: string[] = [];
  private productService: ProductService;

  constructor(onResetClick?: (e: Event) => void) {
    this.view = new FilterView();
    this.filteredColors = new Set();
    this.filteredSizes = new Set();
    this.uniqueColors = [];
    this.uniqueSizes = [];
    this.productService = new ProductService();

    this.view.resetFilterListener((e) => this.resetFilterHandler(e, onResetClick));
    eventBusService.subscribe(Events.dataProductReceived, (data?: EventData) => {
      if (data && Array.isArray(data.colors)) {
        this.updateColors(data.colors);
      }

      if (data && Array.isArray(data.sizes)) {
        this.updateSizes(data.sizes);
      }
    });
  }

  resetFilterHandler(e: Event, onResetClick?: (e: Event) => void) {
    if (onResetClick) {
      onResetClick(e);
    }
    console.log("reset filter click");
  }

  updateColors(colors: string[]) {
    colors.forEach((color) => {
      if (color) {
        this.filteredColors.add(color);
      }
    });
    this.uniqueColors = [...this.filteredColors];
    this.init(this.uniqueColors, this.uniqueSizes);
  }

  updateSizes(sizes: string[]) {
    sizes.forEach((size) => {
      if (size && size.length > 0) {
        this.filteredSizes.add(size);
      }
    });
    this.uniqueSizes = [...this.filteredSizes];
    this.init(this.uniqueColors, this.uniqueSizes);
  }

  private createFilterCheckComponent(labelText: string, formName: string, inputName: string) {
    return new FormCheckComponent({
      labelText,
      formName,
      inputName,
    });
  }

  init(colors?: string[], sizes?: string[]) {
    const filterColorElements: HTMLElement[] = [];
    const filterSizeElements: HTMLElement[] = [];
    const filterPriceRangeElement = this.view.createPriceRangeElement();

    if (colors) {
      colors.forEach((color) => {
        if (color) {
          const colorElement = this.view.createColorElement(color);
          filterColorElements.push(colorElement);
        }
      });
    }

    if (sizes) {
      sizes.forEach((size) => {
        if (size) {
          const sizeElement = this.createFilterCheckComponent(size, "size", `size-${size}`).init();
          filterSizeElements.push(sizeElement);
        }
      });
    }

    const sidebarElements: HTMLElement[] = [
      this.view.categorySizeTitle,
      ...filterSizeElements.sort((a, b) => a.innerText.localeCompare(b.innerText)),
      this.view.categoryColorTitle,
      ...filterColorElements.sort((a, b) => a.innerText.localeCompare(b.innerText)),
      this.view.categoryPriceTitle,
      filterPriceRangeElement,
    ];

    return this.view.render(sidebarElements);
  }
}
