import { ViewBuilder } from "@Interfaces/view-builder";
import { Price } from "@Services/product/product.types";

export default class OrderTotalView extends ViewBuilder {
  private element: HTMLElement;
  private title: HTMLElement;
  private div: HTMLElement;

  constructor(totalPrice: Price) {
    super();
    this.element = this.createElement("div");
    this.title = this.createElement("h2");
    this.title.textContent = totalPrice.value.toString();
    this.div = this.createElement("div");

    this.element.append(this.div, this.title);
  }

  render() {
    return this.element;
  }
}
