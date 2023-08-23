import { ViewBuilder } from "@Interfaces/view-builder";

export default class CatalogView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "d-flex", "justify-content-between"],
    });
  }

  displayProducts(list: HTMLElement) {
    this.element.append(list);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
