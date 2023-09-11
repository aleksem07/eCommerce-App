import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CartListView extends ViewBuilder {
  private element: HTMLElement;
  private header: HTMLHeadingElement;
  private homeLink: HTMLLinkElement;
  private itemsWrapper: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement("div");
    this.header = this.createHeaderElement();
    this.homeLink = this.createHomeLink();
    this.itemsWrapper = this.createItemsWrapper();
  }

  createHeaderElement(): HTMLHeadingElement {
    const header = this.createElement<HTMLHeadingElement>("h1", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    header.textContent = "Your cart";

    return header;
  }

  createHomeLink(): HTMLLinkElement {
    const link = this.createElement<HTMLLinkElement>("a", {
      classes: ["fs-2", "link-primary", "link-offset-2"],
    });
    link.textContent = "Home";
    link.href = Routes.MAIN;

    return link;
  }

  createItemsWrapper(): HTMLDivElement {
    const itemsWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["px-4", "border", "rounded", "mt-5"],
    });

    return itemsWrapper;
  }

  render(cartListItems: HTMLElement[]) {
    this.element.innerHTML = "";
    this.itemsWrapper.append(...cartListItems);
    this.header.append(this.homeLink);
    this.element.append(this.header, this.itemsWrapper);

    return this.element;
  }
}
