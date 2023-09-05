import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserProfileView extends ViewBuilder {
  private element: HTMLElement;
  private row: HTMLDivElement;
  private sidebar: HTMLDivElement;
  private main: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div", {
      classes: ["container", "my-5"],
    });
    this.row = this.createElement<HTMLDivElement>("div", {
      classes: ["row", "g-3", "g-md-5"],
    });
    this.sidebar = this.createElement<HTMLDivElement>("div", {
      classes: ["col-lg-3", "col-10", "col-md-6", "col-sm-8"],
    });
    this.main = this.createElement<HTMLDivElement>("div", {
      classes: ["col-lg-9", "col-12"],
    });

    this.row.append(this.sidebar, this.main);
    this.element.append(this.row);
  }

  render(userMenu: HTMLElement, userData: HTMLElement) {
    this.sidebar.innerHTML = "";
    this.main.innerHTML = "";
    this.sidebar.append(userMenu);
    this.main.append(userData);
    this.appendTo("#root", this.element);
  }
}
