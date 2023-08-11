import { ViewBuilder } from "@Interfaces/view-builder";

export default class HeaderView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createNavbar();
  }

  private createNavbar(): HTMLElement {
    const navbar = this.createElement("nav", {
      classes: ["navbar", "bg-dark", "border-bottom", "border-body"],
    });
    navbar.dataset.bsTheme = "dark";

    const container = this.createElement("div", {
      classes: ["container-fluid"],
    });

    const links = this.createLinks(["Главная", "О нас", "Услуги", "Контакты"]);
    container.appendChild(links);

    navbar.appendChild(container);
    return navbar;
  }

  private createLinks(linkTexts: string[]): HTMLElement {
    const linksContainer = this.createElement("div", {
      classes: ["navbar-nav"],
    });

    linkTexts.forEach((text) => {
      const link = this.createLink(text);
      linksContainer.appendChild(link);
    });

    return linksContainer;
  }

  private createLink(text: string): HTMLElement {
    const link = this.createElement<HTMLLinkElement>("a", {
      classes: ["nav-link", "text-white"],
    });
    link.href = "#";
    link.textContent = text;
    return link;
  }

  render() {
    document.body.prepend(this.element);
  }
}
