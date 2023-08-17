import NavbarView from "./navbar.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";

export default class NavbarComponent {
  private view: NavbarView;

  constructor() {
    this.view = new NavbarView();
    eventBusService.subscribe(Events.userLogin, this.refreshAuthLinks.bind(this));
    eventBusService.subscribe(Events.loginLinkClicked, this.loginLinkHandler.bind(this));
    eventBusService.subscribe(Events.logoutLinkClicked, this.logoutLinkHandler.bind(this));
  }

  refreshAuthLinks() {
    this.view.refreshAuthLinks();
  }

  loginLinkHandler() {
    if (localStorage.getItem(AUTH_TOKEN_LS)) {
      RouterService.navigateTo(Routes.MAIN);
    } else {
      RouterService.navigateTo(Routes.LOGIN);
    }
  }

  logoutLinkHandler() {
    localStorage.removeItem(AUTH_TOKEN_LS);
    RouterService.navigateTo(Routes.LOGIN);
    this.refreshAuthLinks();
  }

  init() {
    this.view.render();
  }
}
