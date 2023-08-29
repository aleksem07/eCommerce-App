import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";
import { Category, LocalizedString } from "@commercetools/platform-sdk";

export default class CategoryView extends ViewBuilder {
  private element: HTMLElement;
  private card: HTMLLinkElement;

  constructor({ id, name }: Category) {
    super();
    // eslint-disable-next-line no-console
    console.log(id, name);
    this.element = this.createElement("li", {
      classes: ["nav-item"],
    });
    this.card = this.createCategory(id, name);
  }

  private createCategory(id: string, name: LocalizedString) {
    this.card = this.createElement<HTMLLinkElement>("a", {
      classes: ["nav-link"],
    });

    const url = new URL(`${window.location.origin}${Routes.CATALOG}-${id}`);
    this.card.href = url.href;
    this.card.textContent = String(name.en);

    return this.card;
  }

  render() {
    this.element.append(this.card);

    return this.element;
  }
}
