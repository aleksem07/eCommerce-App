import { ViewBuilder } from "@Interfaces/view-builder";

export default class NavbarItemView extends ViewBuilder {
  private link: HTMLLinkElement;
  private element: HTMLLIElement;

  constructor(href: string, text: string) {
    super();
    this.link = this.createElement<HTMLLinkElement>("a", {
      classes: ["nav-link"],
    });
    this.link.href = href;
    this.link.textContent = text;

    this.element = this.createElement("li", {
      classes: ["nav-item"],
    });
    this.element.appendChild(this.link);
  }

  set text(text: string) {
    this.link.textContent = text;
  }

  render() {
    return this.element;
  }
}
