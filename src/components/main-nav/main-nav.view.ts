import { ViewBuilder } from "@Interfaces/view-builder";
import { Routes } from "@Services/router/router.types";
import NavItemComponent from "./nav-item/nav-item";

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

    this.registrationLinkItem = new NavItemComponent(Routes.REGISTRATION, "Register").init();

    this.linksContainer.append(this.loginLinkItem, this.registrationLinkItem);
  }

  render() {
    return this.linksContainer;
  }
}
