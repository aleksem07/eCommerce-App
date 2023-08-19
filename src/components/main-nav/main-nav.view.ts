import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";
import NavItemComponent from "./nav-item/nav-item";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class MainNavView extends ViewBuilder {
  loginLinkItem: HTMLLIElement;
  registrationLinkItem: HTMLLIElement;
  linksContainer: HTMLUListElement;

  constructor() {
    super();
    this.linksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });

    this.loginLinkItem = new NavItemComponent(Routes.LOGIN, "Login").init();
    this.loginLinkItem.addEventListener("click", (event) => {
      event.preventDefault();
      eventBusService.publish(Events.loginLinkClicked);
    });
    this.registrationLinkItem = new NavItemComponent(Routes.REGISTRATION, "Register").init();

    this.linksContainer.append(this.loginLinkItem, this.registrationLinkItem);
  }

  render() {
    return this.linksContainer;
  }
}
