import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductSearchView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render(searchInput: HTMLElement) {
    this.element.append(searchInput);

    return this.element;
  }
}
