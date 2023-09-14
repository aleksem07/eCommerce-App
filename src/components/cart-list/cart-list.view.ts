import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CartListView extends ViewBuilder {
  private element: HTMLElement;
  private header: HTMLHeadingElement;
  private homeLink: HTMLLinkElement;
  private itemsWrapper: HTMLDivElement;
  private subtotalHeader: HTMLHeadingElement;
  deleteButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div");
    this.header = this.createHeaderElement();
    this.homeLink = this.createHomeLink();
    this.itemsWrapper = this.createItemsWrapper();
    this.subtotalHeader = this.createSubtotalHeader();
    this.deleteButton = this.createDeleteButton();
  }

  createHeaderElement(): HTMLHeadingElement {
    const header = this.createElement<HTMLHeadingElement>("h1", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    header.textContent = "Your cart";
    header.id = "cart-header";

    return header;
  }

  createHomeLink(): HTMLLinkElement {
    const link = this.createElement<HTMLLinkElement>("a", {
      classes: ["fs-5", "link-primary", "link-offset-2"],
    });
    link.textContent = "Back to shopping";
    const roadsId = "0580853f-c6c1-4b5a-8a1a-0cf545a29949";
    const url = new URL(`${window.location.origin}${Routes.CATALOG}-${roadsId}`);

    link.href = url.href;

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

  createDeleteButton(): HTMLButtonElement {
    const deleteButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-danger", "btn-sm"],
    });
    deleteButton.textContent = "Delete all items";

    return deleteButton;
  }

  deleteButtonClickListener(handler: () => void) {
    this.deleteButton.addEventListener("click", () => {
      this.deleteButton.disabled = true;
      handler();
    });
  }

  render(
    cartListItems: HTMLElement[],
    totalPrice: HTMLElement,
    cartEmptyHeading?: HTMLElement
  ): HTMLElement {
    this.element.innerHTML = "";
    this.subtotalHeader.append(totalPrice);
    this.itemsWrapper.append(...cartListItems, this.subtotalHeader);
    this.header.append(this.deleteButton);

    if (cartEmptyHeading) {
      cartEmptyHeading.append(this.homeLink);
      this.element.append(cartEmptyHeading);
    } else {
      this.element.append(this.header, this.itemsWrapper);
    }

    return this.element;
  }
}
