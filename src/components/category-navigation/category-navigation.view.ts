import { ViewBuilder } from "@Interfaces/view-builder";

export default class CategoryNavigationView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("section", {
      classes: ["container-fluid"],
    });
  }

  render(linksList: HTMLElement) {
    this.element.append(linksList);

    return this.element;
  }
}
