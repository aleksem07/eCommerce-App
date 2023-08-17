import { ViewBuilder } from "@Interfaces/view-builder";
import NavbarItemComponent from "./navbar-item/navbar-item";
import { Routes } from "@Services/router/router.types";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

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

    const userIcon = this.createLinkIcon("person");
    const logoutIcon = this.createLinkIcon("box-arrow-in-left");
    const loginLinkItem = new NavbarItemComponent(Routes.LOGIN, "Login").init();
    loginLinkItem.addEventListener("click", (event) => {
      event.preventDefault(), eventBusService.publish(Events.loginLinkClicked);
    });
    const registerLinkItem = new NavbarItemComponent(Routes.REGISTRATION, "Register").init();
    const logoutLinkItem = new NavbarItemComponent(Routes.LOGIN, "Logout").init();
    logoutLinkItem.addEventListener("click", (event) => {
      event.preventDefault(), eventBusService.publish(Events.logoutLinkClicked);
    });

    if (localStorage.getItem(AUTH_TOKEN_LS)) {
      authLinksContainer.append(
        userIcon,
        loginLinkItem,
        this.createSeparator(),
        registerLinkItem,
        this.createSeparator(),
        logoutIcon,
        logoutLinkItem
      );
    } else {
      authLinksContainer.append(userIcon, loginLinkItem, this.createSeparator(), registerLinkItem);
    }

    return authLinksContainer;
  }

  refreshAuthLinks() {
    const authLinksContainer = this.getElement(".navbar-nav");
    while (authLinksContainer.firstChild) {
      authLinksContainer.removeChild(authLinksContainer.firstChild);
    }
    const newAuthLinks = this.createAuthLinks();
    authLinksContainer.appendChild(newAuthLinks);
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

  private createLinkIcon(iconName: string) {
    const linkIcon = this.createIcon(`bi-${iconName}`);
    linkIcon.classList.add("me-1", "text-muted");
    const li = this.createElement("li");
    li.appendChild(linkIcon);

    return li;
  }

  render() {
    this.appendTo("header", this.element);
  }
}
