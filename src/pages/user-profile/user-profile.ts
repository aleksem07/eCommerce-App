import UserMenuComponent from "@Components/user-menu/user-menu";
import UserProfileView from "./user-profile.view";

export default class UserProfilePage {
  private view: UserProfileView;
  private userMenu: UserMenuComponent;

  constructor() {
    this.view = new UserProfileView();
    this.userMenu = new UserMenuComponent();
  }

  init() {
    const userMenu = this.userMenu.init();
    this.view.render(userMenu);
  }
}
