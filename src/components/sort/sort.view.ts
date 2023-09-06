import { ViewBuilder } from "@Interfaces/view-builder";

export default class SortView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {});
  }

  render(sort: HTMLElement) {
    this.element.append(sort);

    return this.element;
  }
}
