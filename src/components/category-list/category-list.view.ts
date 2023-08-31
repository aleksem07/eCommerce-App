import { ViewBuilder } from "@Interfaces/view-builder";
import { Button } from "bootstrap";

export default class CategoryListView extends ViewBuilder {
  private element: HTMLElement;
  List: HTMLUListElement;
  dropDownButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["flex"],
    });
    this.dropDownButton = this.createElement("button", {
      classes: ["btn", "btn-primary", "dropdown-toggle", "dropdown-toggle-split"],
    });
    this.dropDownButton.setAttribute("data-bs-toggle", "collapse");
    this.List = this.createElement("ul", {
      classes: ["collapse"],
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
