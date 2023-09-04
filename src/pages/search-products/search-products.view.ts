import { ViewBuilder } from "@Interfaces/view-builder";

export default class SearchProductsView extends ViewBuilder {
  private element: HTMLElement;
  private returnButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "search",
      classes: ["container", "mt-5"],
    });
    this.returnButton = this.createElement("button", {
      classes: ["btn", "btn-primary", "mb-4"],
    });
    this.returnButton.textContent = "Return to catalog";
    this.returnButton.setAttribute("type", "button");

    this.element.prepend(this.returnButton);
  }

  returnButtonListener(handler?: (e: Event) => void) {
    if (handler) {
      this.returnButton.addEventListener("click", handler);
    }
  }

  displayProducts(list: HTMLElement) {
    this.element.append(list);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
