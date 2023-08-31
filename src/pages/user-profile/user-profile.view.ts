import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserProfileView extends ViewBuilder {
  private element: HTMLElement;
  private row: HTMLDivElement;
  private sidebar: HTMLDivElement;
  private main: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div", {
      classes: ["container", "mt-5"],
    });
    this.row = this.createElement<HTMLDivElement>("div", {
      classes: ["row", "g-5"],
    });
    this.sidebar = this.createElement<HTMLDivElement>("div", {
      classes: ["col-3"],
    });
    this.main = this.createElement<HTMLDivElement>("div", {
      classes: ["col-9"],
    });

    this.row.append(this.sidebar, this.main);
    this.element.append(this.row);
  }

  render(userMenu: HTMLElement, userData: HTMLElement) {
    this.sidebar.append(userMenu);
    this.main.append(userData);
    this.appendTo("#root", this.element);
  }
}
