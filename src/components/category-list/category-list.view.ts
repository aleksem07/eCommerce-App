import { ViewBuilder } from "@Interfaces/view-builder";
import { Button } from "bootstrap";

export default class CategoryListView extends ViewBuilder {
  private element: HTMLElement;
  List: HTMLUListElement;
  dropDownButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["d-flex", "ml-2"],
    });
    this.dropDownButton = this.createElement("button", {
      classes: ["dropdown-toggle", "dropdown-toggle-split", "nav-link", "px-2"],
    });
    this.dropDownButton.setAttribute("data-bs-toggle", "collapse");
    this.List = this.createElement("ul", {
      classes: ["collapse", "collapse"],
    });
  }

  changeListener(handler?: (e: Event) => void) {
    if (handler) this.dropDownButton.addEventListener("click", handler);
  }

  render(element: HTMLElement, parentId: string) {
    this.dropDownButton.setAttribute("data-bs-target", `#${parentId}`);
    this.List.id = parentId;
    this.element.append(element, this.dropDownButton);

    return { element: this.element, list: this.List };
  }
}
