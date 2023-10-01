import NavbarView from "./navbar.view";
import NavbarItemComponent from "./navbar-item/navbar-item";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import { AUTH_TOKEN_LS, USERNAME_LS } from "@Services/auth/auth.types";

export default class NavbarComponent {
  private view: NavbarView;
  private loginLinkItem: HTMLElement;
  private logoutLinkItem: HTMLElement;
  private registerLinkItem: HTMLElement;
  private usernameLinkItem?: HTMLLIElement;

  constructor() {
    this.view = new NavbarView();
    this.loginLinkItem = new NavbarItemComponent(
      Routes.LOGIN,
      "Login",
      "bi-box-arrow-in-right"
    ).init();
    this.registerLinkItem = new NavbarItemComponent(
      Routes.REGISTRATION,
      "Register",
      "bi-person-plus"
    ).init();
    this.logoutLinkItem = new NavbarItemComponent(
      Routes.LOGIN,
      "Logout",
      "bi-box-arrow-right"
    ).init();

    eventBusService.subscribe(Events.userLogin, this.initAuthLinks.bind(this));
    eventBusService.subscribe(Events.loginLinkClicked, this.loginLinkHandler.bind(this));
    eventBusService.subscribe(Events.logoutLinkClicked, this.logoutLinkHandler.bind(this));
  }

  initAuthLinks() {
    this.usernameLinkItem = this.createUsernameLink();

    this.view.initAuthLinks({
      loginLinkItem: this.loginLinkItem,
      registerLinkItem: this.registerLinkItem,
      logoutLinkItem: this.logoutLinkItem,
      usernameLinkItem: this.usernameLinkItem,
    });
  }

  private createUsernameLink() {
    const username = localStorage.getItem(USERNAME_LS);

    if (username) {
      return new NavbarItemComponent(Routes.USER_PROFILE, username, "bi-person").init();
    }
  }

  private loginLinkHandler() {
    if (localStorage.getItem(AUTH_TOKEN_LS)) {
      RouterService.navigateTo(Routes.MAIN);
    } else {
      RouterService.navigateTo(Routes.LOGIN);
    }
  }

  private logoutLinkHandler() {
    localStorage.removeItem(AUTH_TOKEN_LS);
    RouterService.navigateTo(Routes.LOGIN);
    this.initAuthLinks();
  }

  init() {
    this.view.render();
    this.initAuthLinks();
  }
}
