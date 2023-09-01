import { ViewBuilder } from "@Interfaces/view-builder";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class NavbarView extends ViewBuilder {
  element: HTMLElement;
  authLinksContainer: HTMLElement;
  private loginLinkItem!: HTMLElement;
  private registerLinkItem!: HTMLElement;
  private logoutLinkItem!: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("nav", {
      classes: ["container", "navbar", "navbar-expand", "bg-dark", "d-flex", "justify-content-end"],
      dataset: [{ bsTheme: "dark" }],
    });

    this.authLinksContainer = this.createAuthLinksContainer();
    this.element.append(this.authLinksContainer);
  }

  initAuthLinks(
    loginLinkItem: HTMLElement,
    registerLinkItem: HTMLElement,
    logoutLinkItem: HTMLElement
  ) {
    this.loginLinkItem = loginLinkItem;
    this.registerLinkItem = registerLinkItem;
    this.logoutLinkItem = logoutLinkItem;
    const userIcon = this.createLinkIcon("person");
    const logoutIcon = this.createLinkIcon("box-arrow-in-left");
    this.loginLinkItem.addEventListener("click", (event: Event) => {
      event.preventDefault();
      eventBusService.publish(Events.loginLinkClicked);
    });
    this.logoutLinkItem.addEventListener("click", (event: Event) => {
      event.preventDefault();
      eventBusService.publish(Events.logoutLinkClicked);
    });

    if (localStorage.getItem(AUTH_TOKEN_LS)) {
      const authLinks = [
        userIcon,
        this.loginLinkItem,
        this.createSeparator(),
        this.registerLinkItem,
        this.createSeparator(),
        logoutIcon,
        this.logoutLinkItem,
      ];
      this.setAuthLinks(authLinks);
    } else {
      const authLinks = [
        userIcon,
        this.loginLinkItem,
        this.createSeparator(),
        this.registerLinkItem,
      ];
      this.setAuthLinks(authLinks);
    }
  }

  private createAuthLinksContainer(): HTMLElement {
    const authLinksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });

    return authLinksContainer;
  }

  setAuthLinks(authLinks: HTMLElement[]) {
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
