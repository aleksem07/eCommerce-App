import { ViewBuilder } from "@Interfaces/view-builder";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { AuthLinkItems } from "./navbar.types";

export default class NavbarView extends ViewBuilder {
  element: HTMLElement;
  authLinksContainer: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("nav", {
      classes: ["container", "navbar", "navbar-expand", "bg-dark", "d-flex", "justify-content-end"],
      dataset: [{ bsTheme: "dark" }],
    });

    this.authLinksContainer = this.createAuthLinksContainer();
    this.element.append(this.authLinksContainer);
  }

  initAuthLinks({
    loginLinkItem,
    registerLinkItem,
    logoutLinkItem,
    usernameLinkItem,
  }: AuthLinkItems) {
    loginLinkItem.addEventListener("click", (event: Event) => {
      event.preventDefault();
      eventBusService.publish(Events.loginLinkClicked);
    });
    logoutLinkItem.addEventListener("click", (event: Event) => {
      event.preventDefault();
      eventBusService.publish(Events.logoutLinkClicked);
    });

    const token = localStorage.getItem(AUTH_TOKEN_LS);

    if (token) {
      const authLinks = [logoutLinkItem];

      if (usernameLinkItem) {
        authLinks.unshift(usernameLinkItem, this.createSeparator());
      }

      this.setAuthLinks(authLinks);
    } else {
      const authLinks = [loginLinkItem, this.createSeparator(), registerLinkItem];
      this.setAuthLinks(authLinks);
    }
  }

  private createAuthLinksContainer(): HTMLElement {
    const authLinksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });

    return authLinksContainer;
  }

  private setAuthLinks(authLinks: HTMLElement[]) {
    this.authLinksContainer.innerHTML = "";
    authLinks.forEach((link) => {
      this.authLinksContainer.appendChild(link);
    });
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

  render() {
    this.appendTo("header", this.element);
  }
}
