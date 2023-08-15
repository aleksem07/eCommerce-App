import { ViewBuilder } from "@Interfaces/view-builder";
import NavbarItemComponent from "./navbar-item/navbar-item";
import { Routes } from "@Services/router/router.types";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";

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
    link.href = Routes.MAIN;
    link.textContent = "Fishing Hub";

    return link;
  }

  private createAuthLinks(): HTMLElement {
    const authLinksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });

    const userIcon = this.createUserIcon();
    const separator = this.createSeparator();
    const loginLinkItem = new NavbarItemComponent(Routes.LOGIN, "Login").init();
    loginLinkItem.addEventListener("click", this.loginLinkHandler.bind(this));
    const registerLinkItem = new NavbarItemComponent(Routes.REGISTRATION, "Register").init();

    authLinksContainer.append(userIcon, loginLinkItem, separator, registerLinkItem);

    return authLinksContainer;
  }

  private loginLinkHandler(event: Event) {
    event.preventDefault();
    const authToken = localStorage.getItem(AUTH_TOKEN_LS);

    if (authToken) {
      window.location.href = Routes.MAIN;
    } else {
      window.location.href = Routes.LOGIN;
    }
  }

  private createSeparator() {
    const separator = this.createElement("span", {
      classes: ["ms-2", "me-2", "text-muted"],
    });
    separator.textContent = "|";
    const li = this.createElement("li");
    li.appendChild(separator);

    return li;
  }

  private createUserIcon() {
    const userIcon = this.createIcon("bi-person");
    userIcon.classList.add("me-1", "text-muted");
    const li = this.createElement("li");
    li.appendChild(userIcon);

    return li;
  }

  render() {
    this.appendTo("header", this.element);
  }
}
