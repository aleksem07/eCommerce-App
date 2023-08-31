import UserMenuComponent from "@Components/user-menu/user-menu";
import UserProfileView from "./user-profile.view";
import UserDataComponent from "@Components/user-data/user-data";

export default class UserProfilePage {
  private view: UserProfileView;
  private userMenu: UserMenuComponent;
  userData: UserDataComponent;

  constructor() {
    this.view = new UserProfileView();
    this.userMenu = new UserMenuComponent();
    this.userData = new UserDataComponent();
  }

  init() {
    const userMenu = this.userMenu.init();
    const userData = this.userData.init();
    this.view.render(userMenu, userData);
  }
}
