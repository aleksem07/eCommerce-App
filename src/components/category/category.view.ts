import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";
import { Category, LocalizedString } from "@commercetools/platform-sdk";

export default class CategoryView extends ViewBuilder {
  private element: HTMLElement;
  private card?: HTMLLinkElement;
  private id: string;
  private name: LocalizedString;

  constructor({ id, name }: Category) {
    super();
    // eslint-disable-next-line no-console
    console.log(id, name);
    this.element = this.createElement("li", {
      classes: ["nav-item", "px-2"],
    });
    this.id = id;
    this.name = name;
  }

  private createCategory(id: string, name: LocalizedString, parentCard: boolean) {
    if (parentCard) {
      this.card = this.createElement<HTMLLinkElement>("a", {
        classes: ["nav-link", "px-2"],
      });
    } else {
      this.card = this.createElement<HTMLLinkElement>("a", {
        classes: ["dropdown-item", "px-2"],
      });
    }
    const url = new URL(`${window.location.origin}${Routes.CATALOG}-${id}`);
    this.card.href = url.href;
    this.card.textContent = String(name.en);
    this.element.id = id;

    return this.card;
  }

  render(parentCard: boolean) {
    this.card = this.createCategory(this.id, this.name, parentCard);

    return this.card;
  }
}
