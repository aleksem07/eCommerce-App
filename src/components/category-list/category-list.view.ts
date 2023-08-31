import { ViewBuilder } from "@Interfaces/view-builder";

export default class CategoryListView extends ViewBuilder {
  private element: HTMLElement;
  dropDownList: HTMLUListElement;
  dropDownButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["btn-group"],
    });
    this.dropDownButton = this.createElement("button", {
      classes: ["btn", "btn-primary", "dropdown-toggle", "dropdown-toggle-split"],
    });
    this.dropDownButton.setAttribute("data-bs-toggle", "dropdown");
    this.dropDownList = this.createElement("ul", {
      classes: ["dropdown-menu", "dropdown-menu-end", "dropdown-menu-lg-start"],
    });
  }

  render(element: HTMLElement, parentId: string) {
    this.dropDownList.id = parentId;
    this.element.append(element, this.dropDownButton, this.dropDownList);

    return this.element;
  }
}
