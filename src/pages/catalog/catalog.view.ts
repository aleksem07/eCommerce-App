import { ViewBuilder } from "@Interfaces/view-builder";

export default class CatalogView extends ViewBuilder {
  private element: HTMLElement;
  private containerRow: HTMLElement;
  private rightColumn: HTMLElement;
  private header: HTMLHeadingElement;
  private sortingContainer: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "mt-5"],
    });
    this.containerRow = this.createElement("div", {
      classes: ["row", "g-0", "g-md-5"],
    });

    this.rightColumn = this.createElement("div", {
      classes: ["col-md-9", "order-2"],
    });

    this.sortingContainer = this.createElement("div", {
      classes: ["d-flex", "justify-content-between", "mb-4"],
    });

    this.header = this.createHeader();

    this.element.append(this.containerRow);

    this.containerRow.append(this.rightColumn);
  }

  createHeader(): HTMLHeadingElement {
    const header = this.createElement<HTMLHeadingElement>("h1");

    return header;
  }

  displayHeader(name: string) {
    this.header.textContent = name;
    this.rightColumn.prepend(this.header);
  }

  displayProducts(list: HTMLElement) {
    this.rightColumn.append(list);
  }

  displaySidebar(leftColumn: HTMLElement) {
    this.containerRow.append(leftColumn);
  }

  displayToolbar(sort: HTMLElement, pagination: HTMLElement) {
    this.rightColumn.append(this.sortingContainer);
    this.sortingContainer.append(sort, pagination);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
