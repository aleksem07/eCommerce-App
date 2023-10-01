import { ViewBuilder } from "@Interfaces/view-builder";

export default class NavbarItemView extends ViewBuilder {
  private link: HTMLLinkElement;
  private element: HTMLLIElement;
  private icon: HTMLElement;

  constructor(href: string, text: string, icon: string) {
    super();

    this.link = this.createElement<HTMLLinkElement>("a", {
      classes: ["nav-link", "icon-link"],
    });
    this.link.href = href;
    this.link.textContent = text;

    this.icon = this.createIcon(icon);
    this.link.prepend(this.icon);

    this.element = this.createElement("li", {
      classes: ["nav-item"],
    });
    this.element.appendChild(this.link);
  }

  render() {
    return this.element;
  }
}
