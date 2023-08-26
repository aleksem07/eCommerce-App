import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";
import ProductService from "@Services/product/product";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";

export default class FilterComponent {
  private view: FilterView;
  filterBrand: FormCheckComponent;
  filterSize: FormCheckComponent;
  filteredColors: Set<string>;
  private uniqueColors: string[] | void = [];
  private productService: ProductService;

  constructor() {
    this.view = new FilterView();
    this.filterBrand = this.createFilterCheckComponent("BrandName (x)", "brand", "brand");
    this.filterSize = this.createFilterCheckComponent("Size (x)", "size", "size");
    this.filteredColors = new Set();
    this.uniqueColors = [];
    this.productService = new ProductService();
    eventBusService.subscribe(Events.colorsReceived, (colors?: EventData) => {
      if (Array.isArray(colors)) {
        this.updateColors(colors);
      }
    });
  }

  updateColors(colors: string[]) {
    colors.forEach((color) => {
      if (color) {
        this.filteredColors.add(color);
      }
    });
    this.uniqueColors = [...this.filteredColors];
    this.init(this.uniqueColors);
  }

  private createFilterCheckComponent(labelText: string, formName: string, inputName: string) {
    return new FormCheckComponent({
      labelText,
      formName,
      inputName,
    });
  }

  init(colors?: string[]) {
    const filterColorElements: HTMLElement[] = [];

    if (colors) {
      colors.forEach((color) => {
        if (color) {
          const colorElement = this.view.createColorDiv(color);
          filterColorElements.push(colorElement);
        }
      });
    }
    const sidebarElements: HTMLElement[] = [
      this.view.categoryBrandTitle,
      this.filterBrand.init(),
      this.view.categorySizeTitle,
      this.filterSize.init(),
      this.view.categoryColorTitle,
      ...filterColorElements,
      this.view.categoryPriceTitle,
    ];

    return this.view.render(sidebarElements);
  }
}
