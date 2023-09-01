import UserMenuView from "./user-menu.view";
import "./user-menu.scss";

export default class UserMenuComponent {
  private view: UserMenuView;

  constructor(fullName: string, email: string) {
    this.view = new UserMenuView(fullName, email);
  }

  init() {
    return this.view.render();
  }
}
