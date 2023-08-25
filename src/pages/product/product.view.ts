import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "d-flex",
    });
    this.element.textContent = "Product";
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
