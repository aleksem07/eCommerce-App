import UserInfoComponent from "@Components/user-info/user-info";
import UserDataView from "./user-data.view";

export default class UserDataComponent {
  private view: UserDataView;
  private userInfo: UserInfoComponent;

  constructor() {
    this.view = new UserDataView();
    this.userInfo = new UserInfoComponent();
  }

  init() {
    const userInfo = this.userInfo.init();

    return this.view.render(userInfo);
  }
}
