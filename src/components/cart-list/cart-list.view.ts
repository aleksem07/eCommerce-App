import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CartListView extends ViewBuilder {
  private element: HTMLElement;
  private header: HTMLHeadingElement;
  private homeLink: HTMLLinkElement;
  private itemsWrapper: HTMLDivElement;
  private subtotalHeader: HTMLHeadingElement;

  constructor() {
    super();
    this.element = this.createElement("div");
    this.header = this.createHeaderElement();
    this.homeLink = this.createHomeLink();
    this.itemsWrapper = this.createItemsWrapper();
    this.subtotalHeader = this.createSubtotalHeader();
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
      classes: ["fs-5", "link-primary", "link-offset-2"],
    });
    link.textContent = "Back to shopping";
    link.href = Routes.MAIN;

    return link;
  }

  createSubtotalHeader(): HTMLHeadingElement {
    const header = this.createElement<HTMLHeadingElement>("h5", {
      classes: ["d-flex", "justify-content-end", "align-items-center", "py-3"],
    });
    header.textContent = "Subtotal: ";

    return header;
  }

  createItemsWrapper(): HTMLDivElement {
    const itemsWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["px-4", "border", "rounded", "mt-5"],
    });

    return itemsWrapper;
  }

  render(cartListItems: HTMLElement[], totalPrice: HTMLElement): HTMLElement {
    this.element.innerHTML = "";
    this.subtotalHeader.append(totalPrice);
    this.itemsWrapper.append(...cartListItems, this.subtotalHeader);
    this.header.append(this.homeLink);
    this.element.append(this.header, this.itemsWrapper);

    return this.element;
  }
}
