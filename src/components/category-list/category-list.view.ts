import { ViewBuilder } from "@Interfaces/view-builder";

export default class CategoryListView extends ViewBuilder {
  private element: HTMLElement;
  private list: HTMLUListElement;
  private dropDownButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["d-flex", "ml-2"],
    });
    this.dropDownButton = this.createElement("button", {
      classes: ["dropdown-toggle", "dropdown-toggle-split", "nav-link", "px-2"],
    });
    this.dropDownButton.setAttribute("data-bs-toggle", "collapse");
    this.list = this.createElement("ul", {
      classes: ["collapse", "container"],
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
    this.element.append(element, this.dropDownButton);

    return { element: this.element, list: this.list };
  }
}
