import { ViewBuilder } from "@Interfaces/view-builder";

export default class CatalogView extends ViewBuilder {
  private element: HTMLElement;
  private containerRow: HTMLElement;
  private rightColumn: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "mt-5"],
    });
    this.containerRow = this.createElement("div", {
      classes: ["row", "g-3"],
    });

    this.rightColumn = this.createElement("div", {
      classes: ["col-md-9", "order-2"],
    });

    this.element.append(this.containerRow);

    this.containerRow.append(this.rightColumn);
  }

  displayProducts(list: HTMLElement) {
    this.rightColumn.append(list);
  }

  displaySidebar(leftColumn: HTMLElement) {
    this.containerRow.append(leftColumn);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
