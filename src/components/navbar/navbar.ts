import NavbarView from "./navbar.view";
import NavbarItemComponent from "./navbar-item/navbar-item";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import { AUTH_TOKEN_LS, USERNAME_ID_LS, USERNAME_LS } from "@Services/auth/auth.types";
import { USER_CART_ID_LS, ANON_CART_ID_LS, LINE_ITEMS_COUNT_LS } from "@Services/cart/cart.types";

export default class NavbarComponent {
  private view: NavbarView;
  private loginLinkItem: HTMLElement;
  private logoutLinkItem: HTMLElement;
  private registerLinkItem: HTMLElement;
  private usernameLinkItem?: HTMLLIElement;
  private aboutUsLinkItem: HTMLLIElement;
  private phone: HTMLElement;

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
    this.aboutUsLinkItem = new NavbarItemComponent(Routes.ABOUT_US, "About Us").init();
    this.phone = new NavbarItemComponent("tel:1234567890", "(123)-456-7890", "bi-telephone").init();

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
    localStorage.removeItem(USERNAME_LS);
    localStorage.removeItem(USERNAME_ID_LS);
    localStorage.removeItem(USER_CART_ID_LS);
    localStorage.removeItem(ANON_CART_ID_LS);
    localStorage.removeItem(LINE_ITEMS_COUNT_LS);
    RouterService.navigateTo(Routes.LOGIN);
    this.initAuthLinks();
  }

  init() {
    this.view.render(this.phone, this.aboutUsLinkItem);
    this.initAuthLinks();
  }
}
