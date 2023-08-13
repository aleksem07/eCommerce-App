import { ViewBuilder } from "@Interfaces/view-builder";

export default class NavbarView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("nav", {
      classes: [
        "container",
        "navbar",
        "navbar-expand",
        "bg-dark",
        "d-flex",
        "justify-content-between",
      ],
      dataset: [{ bsTheme: "dark" }],
    });

    const brandLink = this.createBrandLink();
    const authLinks = this.createAuthLinks();
    this.element.append(brandLink, authLinks);
  }

  private createBrandLink(): HTMLLinkElement {
    const link = this.createElement<HTMLLinkElement>("a", {
      classes: ["navbar-brand"],
    });
    link.href = "#";
    link.textContent = "Fishing Hub";
    return link;
  }

  private createAuthLinks(): HTMLElement {
    const authLinksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });

    const userIcon = this.createIcon("bi-person");
    userIcon.classList.add("me-1", "text-muted");

    const loginLink = this.createElement<HTMLLinkElement>("a", {
      classes: ["nav-link"],
    });
    loginLink.href = "#login";
    loginLink.textContent = "Log in";

    const loginLinkItem = this.createElement("li", {
      classes: ["nav-item"],
    });
    loginLinkItem.appendChild(loginLink);

    const separator = this.createElement("span", {
      classes: ["ms-2", "me-2", "text-muted"],
    });
    separator.textContent = "|";

    const registerLink = this.createElement<HTMLLinkElement>("a", {
      classes: ["nav-link"],
    });
    registerLink.href = "#register";
    registerLink.textContent = "Register";

    const registerLinkItem = this.createElement("li", {
      classes: ["nav-item"],
    });
    registerLinkItem.appendChild(registerLink);

    authLinksContainer.append(userIcon, loginLinkItem, separator, registerLinkItem);

    return authLinksContainer;
  }

  render() {
    this.appendTo("header", this.element);
  }
}
