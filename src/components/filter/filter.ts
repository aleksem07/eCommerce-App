import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";
import FormControlComponent from "@Components/form-control/form-control";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";

export default class FilterComponent {
  private view: FilterView;
  private uniqueColors: string[] = [];
  private uniqueSizes: string[] = [];
  private rangeMinPrice: FormControlComponent;
  private rangeMaxPrice: FormControlComponent;
  private priceChangeTimer: NodeJS.Timeout | null = null;

  constructor(onResetClick?: (e: Event) => void) {
    this.view = new FilterView();
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
      const hasColors = ObjectGuardUtil.hasProp<string[]>(data, "colors");
      const hasSizes = ObjectGuardUtil.hasProp<string[]>(data, "sizes");

      if (hasColors) {
        this.updateColors(data.colors);
      }

      if (hasSizes) {
        this.updateSizes(data.sizes);
      }
    });
  }

  private resetFilterHandler(e: Event, onResetClick?: (e: Event) => void) {
    if (onResetClick) {
      onResetClick(e);
    }
    this.resetPriceRange();
    eventBusService.publish(Events.resetFilters);
  }

  private handleSizeCheckboxClick(e: Event, size: string) {
    eventBusService.publish(Events.filterBySize, { size });
  }

  private handleColorElementClick(e: Event, color: string) {
    if (e.target) {
      const checkbox = e.target as HTMLDivElement;
      const isColorPicker = checkbox.classList.contains("color-picker");

      if (isColorPicker) {
        this.toggleColorSelection(checkbox, color);
      }
    }
  }

  private toggleColorSelection(checkbox: HTMLElement, color: string) {
    if (!checkbox.classList.contains("color-checked")) {
      checkbox.classList.add("color-checked");
    } else {
      checkbox.classList.remove("color-checked");
    }
    eventBusService.publish(Events.filterByColor, { color });
  }

  private handleMinPriceChange(e: Event) {
    if (e.target) {
      const input = e.target as HTMLInputElement;
      let minValue = input.value;
      minValue = (Number(minValue) * 100).toString();

      if (this.priceChangeTimer !== null) {
        clearTimeout(this.priceChangeTimer);
      }

      this.priceChangeTimer = setTimeout(() => {
        eventBusService.publish(Events.minPriceFilterValue, { minValue });
      }, 500);
    }
  }

  private handleMaxPriceChange(e: Event) {
    if (e.target) {
      const input = e.target as HTMLInputElement;
      let maxValue = input.value;
      maxValue = (Number(maxValue) * 100).toString();

      if (maxValue == "0") {
        maxValue = "*";
      }

      if (this.priceChangeTimer !== null) {
        clearTimeout(this.priceChangeTimer);
      }

      this.priceChangeTimer = setTimeout(() => {
        eventBusService.publish(Events.maxPriceFilterValue, { maxValue });
      }, 500);
    }
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

  private createFilterSizeComponent(labelText: string, formName: string, inputName: string) {
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
          const sizeElement = this.createFilterSizeComponent(size, "size", `size-${size}`).init();
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
