import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CartIconView extends ViewBuilder {
  private element: HTMLLinkElement;
  private cartIcon: HTMLElement;
  private badgeElement: HTMLSpanElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLLinkElement>("a", {
      classes: ["ms-3"],
    });
    this.element.href = Routes.CART;
    this.cartIcon = this.createCartIcon();
    this.badgeElement = this.createBadgeElement();
  }

  private createCartIcon(): HTMLElement {
    const icon = this.createIcon("bi-cart2");

    return icon;
  }

  private createBadgeElement(): HTMLSpanElement {
    const badge = this.createElement("span", {
      classes: ["badge", "text-bg-secondary", "ms-2"],
    });
    badge.textContent = "0";

    return badge;
  }

  render(lineItemsCount: string) {
    this.element.innerHTML = "";

    if (Number(lineItemsCount) > 0) {
      this.badgeElement.textContent = lineItemsCount;
    }
    this.element.append(this.cartIcon, this.badgeElement);

    return this.element;
  }
}
