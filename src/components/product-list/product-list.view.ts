import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductListView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["row", "g-3"],
    });
  }

  createColumn(element: HTMLElement) {
    const column = this.createElement("div", {
      classes: ["col-4"],
    });
    column.append(element);

    return column;
  }

  render(...elements: HTMLElement[]) {
    const columns = elements.map((element) => this.createColumn(element));
    this.element.append(...columns);

    return this.element;
  }
}
