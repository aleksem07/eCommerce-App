import { ViewBuilder } from "@Interfaces/view-builder";

export default class CatalogView extends ViewBuilder {
  private element: HTMLElement;
  private containerRow: HTMLElement;
  private leftColumn: HTMLElement;
  private rightColumn: HTMLElement;
  private sortingRow: HTMLElement;
  private productRow: HTMLElement;
  private sortingColumn: HTMLElement;
  private productColumn: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "mt-5"],
    });
    this.containerRow = this.createElement("div", {
      classes: ["row"],
    });
    this.sortingRow = this.createElement("div", {
      classes: ["row"],
    });
    this.productRow = this.createElement("div", {
      classes: ["row"],
    });
    this.leftColumn = this.createElement("div", {
      classes: ["col-md-3"],
    });
    this.rightColumn = this.createElement("div", {
      classes: ["col-md-9"],
    });
    this.sortingColumn = this.createElement("div", {
      classes: ["col-md-12"],
    });
    this.productColumn = this.createElement("div", {
      classes: ["col-md-12", "mt-3"],
    });

    this.element.append(this.containerRow);
    this.containerRow.append(this.leftColumn);
    this.containerRow.append(this.rightColumn);
    this.rightColumn.append(this.sortingRow);
    this.sortingRow.append(this.sortingColumn);
    this.rightColumn.append(this.productRow);
    this.productRow.append(this.productColumn);
  }

  displayProducts(list: HTMLElement) {
    this.productColumn.append(list);
  }

  displaySidebar(leftColumn: HTMLElement) {
    this.leftColumn.append(leftColumn);
  }

  displayToolbar(sortingColumn: HTMLElement) {
    this.sortingColumn.append(sortingColumn);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
