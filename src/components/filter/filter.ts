import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";
import ProductService from "@Services/product/product";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";

export default class FilterComponent {
  private view: FilterView;
  private uniqueColors: string[] = [];
  private uniqueSizes: string[] = [];
  private productService: ProductService;

  constructor(onResetClick?: (e: Event) => void) {
    this.view = new FilterView();
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
    const filteredColors: Set<string> = new Set();
    colors.forEach((color) => {
      if (color) {
        filteredColors.add(color);
      }
    });
    this.uniqueColors = [...filteredColors];
    this.init(this.uniqueColors, this.uniqueSizes);
  }

  updateSizes(sizes: string[]) {
    const filteredSizes: Set<string> = new Set();
    sizes.forEach((size) => {
      if (size && size.length > 0) {
        filteredSizes.add(size);
      }
    });
    this.uniqueSizes = [...filteredSizes];
    this.init(this.uniqueColors, this.uniqueSizes);
  }

  private createFilterCheckComponent(labelText: string, formName: string, inputName: string) {
    return new FormCheckComponent({
      labelText,
      formName,
      inputName,
    });
  }

  private renderColorElements(colors: string[], element?: HTMLElement[]) {
    if (colors) {
      colors.forEach((color) => {
        if (color) {
          const colorElement = this.view.createColorElement(color);

          if (element) {
            element.push(colorElement);
          }
        }
      });
    }
  }

  private renderSizeElements(sizes: string[], element?: HTMLElement[]) {
    if (sizes) {
      sizes.forEach((size) => {
        if (size) {
          const sizeElement = this.createFilterCheckComponent(size, "size", `size-${size}`).init();

          if (element) {
            element.push(sizeElement);
          }
        }
      });
    }
  }

  init(colors?: string[], sizes?: string[]) {
    const filterColorElements: HTMLElement[] = [];
    const filterSizeElements: HTMLElement[] = [];
    const filterPriceRangeElement = this.view.createPriceRangeElement();

    if (colors) {
      this.renderColorElements(colors, filterColorElements);
    }

    if (sizes) {
      this.renderSizeElements(sizes, filterSizeElements);
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
