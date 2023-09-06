import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductPaginationView extends ViewBuilder {
  private element: HTMLElement;
  private prevButton: HTMLElement;
  private nextButton: HTMLElement;
  private paginationContainer: HTMLElement;
  private paginationElement: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["pagination", "align-items-center", "gap-2"],
    });
    this.prevButton = this.createElement("button", {
      classes: ["btn", "bi", "bi-arrow-left"],
    });
    this.nextButton = this.createElement("button", {
      classes: ["btn", "bi", "bi-arrow-right"],
    });
    this.paginationContainer = this.createElement("ul", {
      classes: ["pagination", "mb-0", "pb-0"],
    });
    this.paginationElement = this.createElement("li", {
      classes: ["page-item"],
    });
    this.paginationElement.textContent = "1";

    this.paginationContainer.append(this.paginationElement);
    this.element.append(this.prevButton, this.paginationContainer, this.nextButton);
  }

  render() {
    return this.element;
  }
}
