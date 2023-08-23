import MainNavView from "./main-nav.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Routes } from "@Services/router/router.types";
import LinkComponent from "@Components/link/link";

export default class MainNavComponent {
  private view: MainNavView;
  private loginLinkItem: HTMLLinkElement;
  private registrationLinkItem: HTMLLinkElement;
  private catalogLinkItem: HTMLLinkElement;
  private productsLinkItem: HTMLLinkElement;
  private userProfileLinkItem: HTMLLinkElement;

  constructor() {
    this.view = new MainNavView();
    this.loginLinkItem = new LinkComponent({ href: Routes.LOGIN, text: "Login" }).init();
    this.registrationLinkItem = new LinkComponent({
      href: Routes.REGISTRATION,
      text: "Register",
    }).init();
    this.catalogLinkItem = new LinkComponent({ href: Routes.CATALOG, text: "Catalog" }).init();
    this.productsLinkItem = new LinkComponent({ href: Routes.PRODUCT, text: "Products" }).init();
    this.userProfileLinkItem = new LinkComponent({
      href: Routes.USER_PROFILE,
      text: "Profile",
    }).init();

    this.view.loginLinkListener(this.loginLinkItem, this.loginLinkHandler.bind(this));
  }

  loginLinkHandler() {
    eventBusService.publish(Events.loginLinkClicked);
  }

  init() {
    return this.view.render(
      this.loginLinkItem,
      this.registrationLinkItem,
      this.catalogLinkItem,
      this.productsLinkItem,
      this.userProfileLinkItem
    );
  }
}
