import { ViewBuilder } from "@Interfaces/view-builder";

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

  changeListener(handler?: (e: Event) => void) {
    if (handler) {
      this.dropDownButton.addEventListener("click", handler);
    }
  }

  render(element: HTMLElement, parentId: string) {
    this.dropDownButton.setAttribute("data-bs-target", `#${parentId}`);
    this.list.id = parentId;

    if (element.textContent !== "Sale") {
      this.element.append(element, this.list, this.dropDownButton);
    } else {
      this.element.append(element);
    }

    return this.element;
  }
}
