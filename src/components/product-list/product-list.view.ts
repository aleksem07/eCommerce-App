import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductListView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render(...elements: HTMLElement[]) {
    this.element.append(...elements);

    return this.element;
  }
}
