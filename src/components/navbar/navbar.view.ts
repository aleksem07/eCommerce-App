import { ViewBuilder } from "@Interfaces/view-builder";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { AuthLinkItems } from "./navbar.types";

export default class NavbarView extends ViewBuilder {
  element: HTMLElement;
  availableContainer: HTMLElement;
  available: HTMLElement;
  menuContainer: HTMLElement;
  authLinksContainer: HTMLElement;

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
    this.available = this.createElement("p", {
      classes: ["text-muted", "mb-0"],
    });

    this.availableContainer = this.createLinksContainer();
    this.availableContainer.classList.add("d-none", "d-sm-block");
    this.menuContainer = this.createLinksContainer();
    this.authLinksContainer = this.createLinksContainer();

    this.availableContainer.append(this.available);
    this.element.append(this.availableContainer, this.menuContainer, this.authLinksContainer);
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

  private createLinksContainer(): HTMLElement {
    const linksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });

    return linksContainer;
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

  render(phone: HTMLElement, aboutUsLinkItem: HTMLElement) {
    this.availableContainer.append(phone);
    this.menuContainer.append(aboutUsLinkItem);
    this.appendTo("header", this.element);
  }
}
