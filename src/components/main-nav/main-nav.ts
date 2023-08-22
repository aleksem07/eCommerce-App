import MainNavView from "./main-nav.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Routes } from "@Services/router/router.types";
import NavItemComponent from "./nav-item/nav-item";

export default class MainNavComponent {
  private view: MainNavView;
  private loginLinkItem: HTMLElement;
  private registrationLinkItem: HTMLElement;

  constructor() {
    this.view = new MainNavView();
    this.loginLinkItem = new NavItemComponent(Routes.LOGIN, "Login").init();
    this.registrationLinkItem = new NavItemComponent(Routes.REGISTRATION, "Register").init();

    this.view.loginLinkListener(this.loginLinkItem, this.loginLinkHandler.bind(this));
  }

  loginLinkHandler() {
    eventBusService.publish(Events.loginLinkClicked);
  }

  init() {
    this.view.initLinks(this.loginLinkItem, this.registrationLinkItem);

    return this.view.render();
  }
}
