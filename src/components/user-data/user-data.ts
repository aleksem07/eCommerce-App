import UserInfoComponent from "@Components/user-info/user-info";
import UserDataView from "./user-data.view";
import UserPasswordComponent from "@Components/user-password/user-password";

export default class UserDataComponent {
  private view: UserDataView;
  private userInfo: UserInfoComponent;
  private userPassword: UserPasswordComponent;

  constructor() {
    this.view = new UserDataView();
    this.userInfo = new UserInfoComponent();
    this.userPassword = new UserPasswordComponent();
  }

  init() {
    const userInfo = this.userInfo.init();
    const userPassword = this.userPassword.init();

    return this.view.render(userInfo, userPassword);
  }
}
