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

  resetFilterHandler(e: Event, onResetClick?: (e: Event) => void) {
    if (onResetClick) {
      onResetClick(e);
    }
    console.log("reset filter click");
  }

  handleSizeCheckboxClick(event: Event, size: string) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      console.log(size);
    }
  }

  handleColorElementClick(event: Event, color: string) {
    console.log(color);
  }

  handleMinPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const minValue = input.value;
    console.log(`Min Price changed: ${minValue}`);
  }

  handleMaxPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const maxValue = input.value;
    console.log(`Max Price changed: ${maxValue}`);
  }

  updateColors(colors: string[]) {
    const filteredColors: Set<string> = new Set();
    colors.forEach((color) => {
      if (color) {
        filteredColors.add(color);
      }
    });
    this.uniqueColors = [...filteredColors];
    this.init(this.uniqueColors.sort(), this.uniqueSizes);
  }

  updateSizes(sizes: string[]) {
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
          sizeElement.addEventListener("click", (e) => this.handleSizeCheckboxClick(e, size));

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

    if (minInput) {
      minInput.addEventListener("input", (e) => this.handleMinPriceChange(e));
    }

    if (maxInput) {
      maxInput.addEventListener("input", (e) => this.handleMaxPriceChange(e));
    }

    return this.view.render(filterSizeElements, filterColorElements, filterPriceRangeElement);
  }
}
