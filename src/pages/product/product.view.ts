import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "mt-5"],
    });
    this.element.textContent = "Product";
  }

  render(information: HTMLElement) {
    this.element.append(information);
    this.appendTo("#root", this.element);
  }
}
