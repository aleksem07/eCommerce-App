import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CategoryNavigationListItemView extends ViewBuilder {
  private element?: HTMLLinkElement;
  private id: string;
  private name: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  private createCategory(id: string, name: string, isParentCard: boolean) {
    if (isParentCard) {
      this.element = this.createElement<HTMLLinkElement>("a", {
        classes: ["nav-link", "px-2"],
      });
    } else {
      this.element = this.createElement<HTMLLinkElement>("a", {
        classes: ["dropdown-item", "px-2"],
      });
    }
    const url = new URL(`${window.location.origin}${Routes.CATALOG}-${id}`);
    this.element.href = url.href;
    this.element.textContent = name;

    return this.element;
  }

  render(isParentCard: boolean) {
    return this.createCategory(this.id, this.name, isParentCard);
  }
}
