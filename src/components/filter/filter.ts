import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";
import FormControlComponent from "@Components/form-control/form-control";
import ProductService from "@Services/product/product";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";

export default class FilterComponent {
  private view: FilterView;
  private uniqueColors: string[] = [];
  private uniqueSizes: string[] = [];
  private productService: ProductService;
  private rangeMinPrice: FormControlComponent;
  private rangeMaxPrice: FormControlComponent;

  constructor(onResetClick?: (e: Event) => void) {
    this.view = new FilterView();
    this.uniqueColors = [];
    this.uniqueSizes = [];
    this.productService = new ProductService();
    this.rangeMinPrice = new FormControlComponent({
      formName: "filterPrice",
      inputName: "minPrice",
      labelText: "",
      helpText: "",
      placeholderText: "0",
      type: "number",
    });
    this.rangeMaxPrice = new FormControlComponent({
      formName: "filterPrice",
      inputName: "maxPrice",
      labelText: "",
      helpText: "",
      placeholderText: "10000",
      type: "number",
    });

    this.view.resetFilterListener((e) => this.resetFilterHandler(e, onResetClick));
    eventBusService.subscribe(Events.fetchProductsSuccessfully, (data?: EventData) => {
      if (data && Array.isArray(data.colors)) {
        this.updateColors(data.colors);
      }

      if (data && Array.isArray(data.sizes)) {
        this.updateSizes(data.sizes);
      }
    });
  }

  private resetFilterHandler(e: Event, onResetClick?: (e: Event) => void) {
    if (onResetClick) {
      onResetClick(e);
    }
    this.resetPriceRange();
    eventBusService.publish(Events.resetFiltersClick);
  }

  private handleSizeCheckboxClick(e: Event, size: string) {
    eventBusService.publish(Events.checkboxFilterClick, { size });
  }

  private handleColorElementClick(e: Event, color: string) {
    const checkbox = e.target as HTMLDivElement;
    const isColorPicker = checkbox.classList.contains("color-picker");

    if (isColorPicker) {
      this.toggleColorSelection(checkbox, color);
    }
  }

  private toggleColorSelection(checkbox: HTMLElement, color: string) {
    if (!checkbox.classList.contains("color-checked")) {
      checkbox.classList.add("color-checked");
    } else {
      checkbox.classList.remove("color-checked");
    }
    eventBusService.publish(Events.colorFilterClick, { color });
  }

  private handleMinPriceChange(e: Event) {
    const input = e.target as HTMLInputElement;
    let minValue = input.value;
    minValue = (+minValue * 100).toString();
    eventBusService.publish(Events.minPriceFilterValue, { minValue });
  }

  private handleMaxPriceChange(e: Event) {
    const input = e.target as HTMLInputElement;
    let maxValue = input.value;
    maxValue = (+maxValue * 100).toString();
    eventBusService.publish(Events.maxPriceFilterValue, { maxValue });
  }

  private updateColors(colors: string[]) {
    const filteredColors: Set<string> = new Set();
    colors.forEach((color) => {
      if (color) {
        filteredColors.add(color);
      }
    });
    this.uniqueColors = [...filteredColors];
    this.init(this.uniqueColors.sort(), this.uniqueSizes);
  }

  private updateSizes(sizes: string[]) {
    const filteredSizes: Set<string> = new Set();
    sizes.forEach((size) => {
      if (size && size.length > 0) {
        filteredSizes.add(size);
      }
    });
    this.uniqueSizes = [...filteredSizes];
    this.init(this.uniqueColors, this.uniqueSizes.sort());
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
          colorElement.addEventListener("click", (e) => this.handleColorElementClick(e, color));

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
          sizeElement.addEventListener("change", (e) => this.handleSizeCheckboxClick(e, size));

          if (element) {
            element.push(sizeElement);
          }
        }
      });
    }
  }

  private resetPriceRange() {
    this.rangeMinPrice.resetValue();
    this.rangeMaxPrice.resetValue();
  }

  init(colors?: string[], sizes?: string[]) {
    this.resetPriceRange();
    const filterColorElements: HTMLElement[] = [];
    const filterSizeElements: HTMLElement[] = [];
    const filterPriceRangeElement = this.view.createPriceRangeElement(
      this.rangeMinPrice.init(),
      this.rangeMaxPrice.init()
    );
    const minInput = this.rangeMinPrice.init();
    const maxInput = this.rangeMaxPrice.init();

    if (colors) {
      this.renderColorElements(colors, filterColorElements);
    }

    if (sizes) {
      this.renderSizeElements(sizes, filterSizeElements);
    }

    minInput.addEventListener("input", (e) => this.handleMinPriceChange(e));
    maxInput.addEventListener("input", (e) => this.handleMaxPriceChange(e));

    return this.view.render(filterSizeElements, filterColorElements, filterPriceRangeElement);
  }
}
