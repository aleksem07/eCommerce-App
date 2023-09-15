import { ViewBuilder } from "@Interfaces/view-builder";

export default class CartEmptyHeadingView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("h2", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    this.element.textContent = "Your cart is empty";
  }

  render() {
    return this.element;
  }
}
