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
    this.prevButton.setAttribute("type", "button");
    this.nextButton = this.createElement("button", {
      classes: ["btn", "bi", "bi-arrow-right"],
    });
    this.nextButton.setAttribute("type", "button");
    this.paginationContainer = this.createElement("ul", {
      classes: ["pagination", "mb-0"],
    });
    this.paginationElement = this.createElement("li", {
      classes: ["page-item", "h5", "m-0"],
    });
    this.paginationElement.textContent = "1";

    this.paginationContainer.append(this.paginationElement);
    this.element.append(this.prevButton, this.paginationContainer, this.nextButton);
  }

  prevPageListener(handler?: (e: Event) => void) {
    if (handler) {
      this.prevButton.addEventListener("click", handler);
    }
  }

  nextPageListener(handler?: (e: Event) => void) {
    if (handler) {
      this.nextButton.addEventListener("click", handler);
    }
  }

  updatePageNumber(pageNumber: number) {
    this.paginationElement.textContent = `${pageNumber} `;
  }

  hideArrow(buttonName: string) {
    if (buttonName === "prev") {
      this.prevButton.classList.add("hide-element");
    } else if (buttonName === "next") {
      this.nextButton.classList.add("hide-element");
    }
  }

  showArrow(buttonName: string) {
    if (buttonName === "prev") {
      this.prevButton.classList.remove("hide-element");
    } else if (buttonName === "next") {
      this.nextButton.classList.remove("hide-element");
    }
  }

  render() {
    return this.element;
  }
}
