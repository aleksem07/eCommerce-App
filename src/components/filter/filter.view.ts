import "./filter.scss";
import { ViewBuilder } from "@Interfaces/view-builder";

export default class FilterView extends ViewBuilder {
  private element: HTMLElement;
  private resetFiltersButton: HTMLElement;
  private categorySizeTitle: HTMLHeadingElement;
  private categoryColorTitle: HTMLHeadingElement;
  private categoryPriceTitle: HTMLHeadingElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["col-md-3", "order-1"],
    });
    this.resetFiltersButton = this.createResetFiltersButton();
    this.categorySizeTitle = this.createCategoryTitle("size");
    this.categoryColorTitle = this.createCategoryTitle("color");
    this.categoryPriceTitle = this.createCategoryTitle("price");
  }

  createResetFiltersButton() {
    const container = this.createElement("div", {
      classes: ["row"],
    });
    this.resetFiltersButton = this.createElement("button", {
      classes: ["btn"],
    });
    this.resetFiltersButton.setAttribute("type", "button");
    this.resetFiltersButton.textContent = "Reset filters";
    this.resetFiltersButton.className = "btn btn-primary";

    container.append(this.resetFiltersButton);

    return container;
  }

  createCategoryTitle(title: string): HTMLHeadingElement {
    const container: HTMLHeadingElement = this.createElement("div", {
      classes: ["row"],
    });
    const createCategoryTitle: HTMLHeadingElement = this.createElement("h6", {
      id: `category-${title}-title`,
      classes: ["py-3"],
    });
    createCategoryTitle.textContent = title[0].toUpperCase() + title.slice(1);

    container.append(createCategoryTitle);

    return container;
  }

  createColorElement(color?: string): HTMLElement {
    const container = this.createElement("div", {
      classes: ["col-md-3", "mb-1"],
    });
    const colorPicker = this.createElement("div", {
      classes: ["color-picker", "rounded-circle", "mx-auto"],
    });

    const title = this.createElement("p", {
      classes: ["mt-1", "text-center"],
    });

    if (color) {
      colorPicker.style.backgroundColor = color;
      title.textContent = color[0].toUpperCase() + color.slice(1);
    }

    if (color == "multicolored") {
      colorPicker.style.background = "linear-gradient(45deg, red 30%, yellow 50%, blue 70%)";
      title.textContent = "Multi";
    }
    container.append(colorPicker, title);

    return container;
  }

  createPriceRangeElement(minInput: HTMLElement, maxInput: HTMLElement): HTMLElement {
    const container = this.createElement("div", {
      classes: ["d-flex", "align-items-center"],
    });
    const separator = this.createElement("span", {
      classes: ["mx-1", "mt-4"],
    });
    separator.textContent = "-";

    container.append(minInput, separator, maxInput);

    return container;
  }

  resetFilterListener(handler?: (e: Event) => void) {
    if (handler) {
      this.resetFiltersButton.addEventListener("click", handler);
    }
  }

  render(
    sizeElements: HTMLElement[],
    colorElements: HTMLElement[],
    priceRangeElement: HTMLElement
  ) {
    this.element.innerHTML = "";

    this.element.append(
      this.resetFiltersButton,
      this.categorySizeTitle,
      ...sizeElements,
      this.categoryColorTitle,
      ...colorElements,
      this.categoryPriceTitle,
      priceRangeElement
    );

    return this.element;
  }
}
