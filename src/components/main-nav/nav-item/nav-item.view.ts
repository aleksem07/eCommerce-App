import { ViewBuilder } from "@Interfaces/view-builder";

export default class NavItemView extends ViewBuilder {
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
    this.element.append(this.link);
  }

  render() {
    return this.element;
  }
}
