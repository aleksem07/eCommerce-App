import { ViewBuilder } from "@Interfaces/view-builder";

export default class CartView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "my-5"],
    });
  }

  render(cartList: HTMLElement) {
    this.element.innerHTML = "";
    this.element.append(cartList);
    this.appendTo("#root", this.element);
  }
}
