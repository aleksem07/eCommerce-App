import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";
import ProductService from "@Services/product/product";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";

export default class FilterComponent {
  private view: FilterView;
  filteredColors: Set<string>;
  filteredSizes: Set<string>;
  private uniqueColors: string[] | void = [];
  private uniqueSizes: string[] | void = [];
  private productService: ProductService;

  constructor() {
    this.view = new FilterView();
    this.filteredColors = new Set();
    this.filteredSizes = new Set();
    this.uniqueColors = [];
    this.uniqueSizes = [];
    this.productService = new ProductService();
    eventBusService.subscribe(Events.dataProductReceived, (data: EventData | undefined) => {
      if (data && Array.isArray(data?.colors) && Array.isArray(data?.sizes)) {
        this.updateDataProduct(data.colors, data.sizes);
      }
    });
  }

  updateDataProduct(colors: string[], sizes: string[]) {
    colors.forEach((color) => {
      if (color) {
        this.filteredColors.add(color);
      }
    });
    this.uniqueColors = [...this.filteredColors];

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
          const sizeElement = this.createFilterCheckComponent(size, "size", size).init();
          filterSizeElements.push(sizeElement);
        }
      });
    }
    const sidebarElements: HTMLElement[] = [
      this.view.categorySizeTitle,
      ...filterSizeElements,
      this.view.categoryColorTitle,
      ...filterColorElements,
      this.view.categoryPriceTitle,
    ];

    return this.view.render(sidebarElements);
  }
}
