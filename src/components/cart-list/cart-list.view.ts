import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CartListView extends ViewBuilder {
  private element: HTMLElement;
  private header: HTMLHeadingElement;
  private homeLink: HTMLLinkElement;

  constructor() {
    super();
    this.element = this.createElement("div");
    this.header = this.createHeaderElement();
    this.homeLink = this.createHomeLink();
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

  render(cartListItems: HTMLElement) {
    this.element.innerHTML = "";
    this.header.append(this.homeLink);
    this.element.append(this.header, cartListItems);

    return this.element;
  }
}
