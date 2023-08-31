import UserMenuView from "./user-menu.view";
import "./user-menu.scss";

export default class UserMenuComponent {
  private view: UserMenuView;

  constructor() {
    this.view = new UserMenuView();
  }

  init() {
    return this.view.render();
  }
}
