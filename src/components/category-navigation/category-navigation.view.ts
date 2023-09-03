import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";

export default class CategoryNavigationView extends ViewBuilder {
  private container: HTMLDivElement;
  private linksContainer: HTMLDivElement;
  private nav: HTMLElement;
  private wrapper: HTMLElement;
  private button: HTMLButtonElement;
  private buttonSpan: HTMLSpanElement;

  constructor() {
    super();
    this.nav = this.createElement("nav", {
      classes: ["bg-body-tertiary", "navbar", "navbar-expand-md", "border-bottom"],
    });
    this.container = this.createElement("div", {
      classes: ["container", "justify-content-start"],
    });
    this.wrapper = this.createElement("div", {
      classes: ["navbar-collapse", "collapse"],
    });
    this.wrapper.id = "category-navigation";
    this.linksContainer = this.createElement("ul", {
      classes: ["navbar-nav"],
    });
    this.button = this.createElement("button", {
      classes: ["navbar-toggler", "collapsed"],
    });
    this.buttonSpan = this.createElement("span", {
      classes: ["navbar-toggler-icon"],
    });
    this.button.append(this.buttonSpan);
    this.button.setAttribute("aria-expanded", "false");
    this.button.setAttribute("aria-label", "Toggle navigation");
    this.button.setAttribute("data-bs-toggle", "collapse");
    this.button.setAttribute("data-bs-target", "#category-navigation");
    const brandLink = this.createBrandLink();
    this.container.append(brandLink, this.button);
  }

  private createBrandLink(): HTMLLinkElement {
    const link = this.createElement<HTMLLinkElement>("a", {
      classes: ["navbar-brand", "px-2"],
    });
    link.href = Routes.MAIN;
    link.textContent = "Fishing Hub";

    return link;
  }

  render(linksList: HTMLElement[]) {
    linksList.map((category) => {
      this.linksContainer.append(category);
    });

    this.wrapper.prepend(this.linksContainer);
    this.container.append(this.wrapper);

    this.nav.append(this.container);

    const header = document.getElementsByTagName("header");

    header[0].after(this.nav);
  }
}
