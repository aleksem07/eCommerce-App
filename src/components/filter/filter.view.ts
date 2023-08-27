import { ViewBuilder } from "@Interfaces/view-builder";

export default class FilterView extends ViewBuilder {
  private element: HTMLElement;
  resetFiltersButton: HTMLElement;
  categorySizeTitle: HTMLHeadingElement;
  categoryColorTitle: HTMLHeadingElement;
  categoryPriceTitle: HTMLHeadingElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["sidebar", "row"],
    });
    this.resetFiltersButton = this.createElement("button", {
      classes: ["btn"],
    });
    this.resetFiltersButton.setAttribute("type", "button");
    this.resetFiltersButton.textContent = "Reset filters";
    this.resetFiltersButton.style.color = "white";
    this.resetFiltersButton.style.backgroundColor = "#17696A";
    this.categorySizeTitle = this.createElement("h2", {
      id: `category-size-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categorySizeTitle.textContent = `Size`;
    this.categoryColorTitle = this.createElement("h2", {
      id: `category-color-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categoryColorTitle.textContent = `Color`;
    this.categoryPriceTitle = this.createElement("h2", {
      id: `category-price-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categoryPriceTitle.textContent = `Price`;
  }

  createColorElement(color?: string): HTMLElement {
    const container = this.createElement("div", {
      classes: ["col-md-3", "mb-1"],
    });
    const div = this.createElement("div", {
      classes: ["rounded-circle", "mx-auto"],
    });

    const title = this.createElement("p", {
      classes: ["mt-1", "text-center"],
    });

    if (color) {
      div.style.backgroundColor = color;
      title.textContent = color[0].toUpperCase() + color.slice(1);
    }

    if (color == "multicolored") {
      div.style.background = "linear-gradient(45deg, red 30%, yellow 50%, blue 70%)";
      title.textContent = "Multi";
    }
    div.style.outline = "1px solid black";
    div.style.outlineOffset = "3px";
    div.style.width = "24px";
    div.style.height = "24px";
    div.style.cursor = "pointer";
    container.append(div, title);

    return container;
  }

  createPriceRangeElement(): HTMLElement {
    const container = this.createElement("div", {
      classes: ["mb-1"],
    });

    const priceRangeContainer = this.createElement("div", {
      classes: ["d-flex"],
    });

    const minInput = this.createElement("input", {
      id: "min-price",
      classes: ["form-control", "me-1"],
      dataset: [{ filter: "price", type: "number" }],
    }) as HTMLInputElement;

    const maxInput = this.createElement("input", {
      id: "max-price",
      classes: ["form-control", "ms-1"],
      dataset: [{ filter: "price", type: "number" }],
    }) as HTMLInputElement;

    const separator = this.createElement("span", {
      classes: ["mx-1"],
    });
    minInput.placeholder = "0";
    minInput.type = "number";
    minInput.min = "0";
    maxInput.placeholder = "10000";
    maxInput.type = "number";
    maxInput.min = "0";
    separator.textContent = "-";

    priceRangeContainer.append(minInput, separator, maxInput);
    container.append(priceRangeContainer);

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
