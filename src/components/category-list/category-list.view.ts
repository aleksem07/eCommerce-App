import { ViewBuilder } from "@Interfaces/view-builder";

export default class CategoryListView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("ul", {
      classes: ["nav"],
    });
  }

  render(...elements: HTMLElement[]) {
    this.element.append(...elements);

    return this.element;
  }
}
