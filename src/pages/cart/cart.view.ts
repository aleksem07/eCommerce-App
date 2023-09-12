import { ViewBuilder } from "@Interfaces/view-builder";

export default class CartView extends ViewBuilder {
  private element: HTMLElement;
  private rightColumn: HTMLElement;
  private leftColumn: HTMLElement;
  private row: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["container", "my-5"],
    });
    this.row = this.createElement("div", {
      classes: ["row", "justify-content-between"],
    });
    this.rightColumn = this.createElement("div", {
      classes: ["col-12", "col-lg-4"],
    });
    this.leftColumn = this.createElement("div", {
      classes: ["col-12", "col-lg-7"],
    });
  }

  render(cartList: HTMLElement, orderTotal: HTMLElement) {
    this.element.innerHTML = "";
    this.leftColumn.innerHTML = "";
    this.rightColumn.innerHTML = "";
    this.leftColumn.append(cartList);
    this.rightColumn.append(orderTotal);
    this.row.append(this.leftColumn, this.rightColumn);
    this.element.append(this.row);
    this.appendTo("#root", this.element);
  }
}
