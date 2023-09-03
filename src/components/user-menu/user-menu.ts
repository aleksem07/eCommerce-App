import UserMenuView from "./user-menu.view";
import "./user-menu.scss";
import { AUTH_TOKEN_LS, USERNAME_LS } from "@Services/auth/auth.types";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";

export default class UserMenuComponent {
  private view: UserMenuView;

  constructor(fullName: string, email: string) {
    this.view = new UserMenuView(fullName, email);
    this.view.signOutClickListener(this.signOutClickHandler.bind(this));
  }

  private signOutClickHandler() {
    localStorage.removeItem(AUTH_TOKEN_LS);
    localStorage.removeItem(USERNAME_LS);
    RouterService.navigateTo(Routes.LOGIN);
  }

  init() {
    return this.view.render();
  }
}
