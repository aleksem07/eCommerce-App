import { ViewBuilder } from "@Interfaces/view-builder";
import { Category } from "@Services/category/category.types";

export default class CategoryListView extends ViewBuilder {
  private element: HTMLElement;
  private list: HTMLUListElement;
  private dropDownButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["btn-group"],
    });
    this.dropDownButton = this.createElement("button", {
      classes: ["dropdown-toggle", "dropdown-toggle-split", "nav-link", "px-2"],
    });
    this.dropDownButton.setAttribute("data-bs-toggle", "dropdown");
    this.list = this.createElement("ul", {
      classes: ["dropdown-menu"],
    });
  }

  render(parentLink: HTMLLinkElement, childrenLinks: HTMLLinkElement[], category: Category) {
    this.dropDownButton.setAttribute("data-bs-target", `#${category.id}`);
    this.list.id = category.id;

    if (childrenLinks) {
      this.list.append(...childrenLinks);
      this.element.append(parentLink, this.list, this.dropDownButton);
    } else {
      this.element.append(parentLink);
    }

    return this.element;
  }
}
